import {
  getSingleRow,
  getMultipleRows,
  transactionSingleRow,
  run,
} from "./connection";
import {
  ApiInternalError,
  InconsistentPriceError,
  InconsistentCartError,
  NegativeStockError,
} from "@lib/api";
import { DatabaseError } from "pg";

export type Order = {
  id: string;
  name: string;
  phonenumber: string;
  email: string;
  address: string;
  items: OrderItem[];
  userid: string;
  status: number;
};

export type OrderItem = {
  name: string;
  producer: string;
  category: string;
  price: number;
  amount: number;
  imageurl: string;
};

export const getOrdersByUserId = async (userid: string): Promise<Order[]> => {
  const sql = `
  SELECT id,
         order_status AS orderstatus,
         name,
         phone_number AS phonenumber,
         email,
         address,
         user_id AS userid,
         order_status AS status
  FROM orders
  WHERE user_id=$1;
  `;

  return await getMultipleRows(sql, [userid]);
};

export const changeOrderStatus = async (
  orderStatus: number,
  orderId: string
) => {
  const sql = `
  UPDATE Orders
  SET order_status = $1
  WHERE id = $2;`;
  await run(async (client) => {
    await client.query(sql, [orderStatus, orderId]);
  });
};

export const getAllOrders = async (): Promise<Order[]> => {
  const sql = `
  SELECT id,
         order_status AS orderstatus,
         name,
         phone_number AS phonenumber,
         email,
         address,
         user_id AS userid,
         order_status AS status
  FROM orders;
  `;

  return await getMultipleRows(sql);
};

export const getOrderById = async (id: string): Promise<Order | undefined> => {
  const sql = `
  SELECT id,
         order_status AS orderstatus,
         name,
         phone_number AS phonenumber,
         email,
         address,
         user_id AS userid,
         order_status AS status
  FROM orders
  WHERE id = $1;
  `;

  return await getSingleRow(sql, [id]);
};

export const getOrderItems = async (orderId: string): Promise<OrderItem[]> => {
  const sql = `
  SELECT p.name,
         c.name AS category,
         pr.name AS producer,
         o.price,
         o.quantity AS amount,
         p.image_url AS imageurl
  FROM order_products AS o
    INNER JOIN products AS p ON p.id = o.product_id
    INNER JOIN category AS c ON c.id = p.category_id
    INNER JOIN producer AS pr ON pr.id = p.producer_id
  WHERE o.order_id = $1;
  `;

  return await getMultipleRows(sql, [orderId]);
};

export type CustomerInfo = {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
  address: string;
};

export type CreateOrderItem = {
  id: string;
  amount: number;
};

/**
 * Creates a new order from the customers cart.
 *
 * Errors:
 * - If the subtotal does not match what the client sees in their browser. For example, if
 *   the price was updated between they went to checkout and actually checked out.
 * - If the cart the passed in does not match what the database holds. For example, if they
 *   added items in another tab or on another device.
 * - Product is out of stock.
 *
 * @param customer payment and delivery information.
 * @param items what items they have in their cart, used for verifying we checkout the correct things.
 * @param subtotal what they think they should pay for the products.
 * @returns the order id.
 */
export const createOrder = async (
  userId: string,
  customer: CustomerInfo,
  items: CreateOrderItem[],
  subtotal: number
): Promise<string | undefined> => {
  // Creates a new order, returning the generated order id.
  const createOrderSql = `
  INSERT INTO orders (
    user_id,
    order_status,
    name,
    phone_number,
    email,
    address
  )
  VALUES
    ($1, $2, $3, $4, $5, $6)
  RETURNING id;
  `;

  // Fills the order with products from the cart. Returns what the database found for the cart.
  const createOrderItemSql = `
  INSERT INTO order_products (
    order_id,
    product_id,
    price,
    quantity
  )
  SELECT $1 as order_id,
         p.id as product_id,
         p.price as price,
         c.quantity as quantity
  FROM cart AS c
    JOIN products AS p on p.id = c.product_id
  WHERE c.user_id = $2
  RETURNING product_id AS id,
            price,
            quantity;
  `;
  type CreateOrderDB = {
    id: string;
    price: number;
    quantity: number;
  };

  // Update product stock.
  const updateStockSql = `
  UPDATE products
  SET quantity = products.quantity - c.quantity
  FROM (
  	SELECT cart.product_id,
	       cart.quantity
	FROM cart
	WHERE user_id = $1
  ) AS c
  WHERE products.id = c.product_id
  `;

  // Remove cart.
  const removeCartItemsSql = `
  DELETE FROM cart
  WHERE
    user_id = $1;
  `;

  // To ensure a consistent state, we have to make sure these are all done inside a transaction.
  //
  // There's quite a few RTTs here, we could remedy all this by creating a function in the database
  // which does all of this for us, but let's keep this sane, this is perfectly fine for our use case.
  return await transactionSingleRow<string>(async (client) => {
    let orderId = undefined;

    // Create actual order.
    const createOrderResponse = await client.query(createOrderSql, [
      customer.id,
      0,
      customer.name,
      customer.phoneNumber,
      customer.email,
      customer.address,
    ]);
    if (createOrderResponse.rows.length > 0) {
      orderId = createOrderResponse.rows[0].id;
    }

    // Add all products from the customer's cart.
    const res = await client.query<CreateOrderDB>(createOrderItemSql, [
      orderId,
      userId,
    ]);
    if (res.rows.length == 0) {
      throw ApiInternalError();
    }

    let clientCart: Record<string, CreateOrderItem> = {};
    for (const cart of items) {
      clientCart[cart.id] = cart;
    }

    // Check that both the products in the cart matches client side (1) and that the price matches (2).
    if (items.length != res.rows.length) {
      // Different amount of products on client side & server side carts.
      throw InconsistentCartError();
    }
    let actualSubtotal = 0;
    for (const cart of res.rows) {
      if (clientCart[cart.id] === undefined) {
        // Does not exist in the client side cart.
        throw InconsistentCartError();
      }
      actualSubtotal += cart.price * cart.quantity;
    }
    if (subtotal != actualSubtotal) {
      // Price mismatch from what we want to charge the customer, compared to what they saw in the client.
      throw InconsistentPriceError();
    }

    try {
      // Update product stock.
      await client.query(updateStockSql, [userId]);
    } catch (error) {
      if (error instanceof DatabaseError) {
        const err = error as DatabaseError;
        // Check for negative stock, if so give a nice error to the user.
        if (err.constraint && err.constraint === "quantity_not_negative") {
          throw NegativeStockError();
        }
      }
      // Otherwise, just rethrow.
      throw error;
    }

    // Remove these products from the cart. Let's clear the entire cart removing items that
    // are not necessarily in the order. An alternative could be to only remove items we put
    // in the order. But let's keep a clean slate for the customer after an order.
    await client.query(removeCartItemsSql, [customer.id]);
    return orderId;
  });
};
