import {
  getSingleRow,
  getMultipleRows,
  transactionSingleRow,
  run,
} from "./connection";

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

export const createOrder = async (
  customer: CustomerInfo,
  items: CreateOrderItem[],
  subtotal: number
): Promise<string | undefined> => {
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
         $3 as quantity
  FROM products AS p
  WHERE
    p.id = $2
  RETURNING (price * $3) AS price;
  `;

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

    // Add all the products contained in the order.
    // This can probably be done in a single query, but let's keep it simpler.
    let total = 0;
    for (let item of items) {
      const res = await client.query(createOrderItemSql, [
        orderId,
        item.id,
        item.amount,
      ]);
      if (res.rows.length > 0) {
        total += parseInt(res.rows[0].price);
      }
    }
    if (subtotal != total) {
      // Price mismatch from what we want to charge the customer, compared to what they saw in the client.
      throw Error("price mismatch");
    }

    // Remove these products from the cart. Let's clear the entire cart removing items that
    // are not necessarily in the order. An alternative could be to only remove items we put
    // in the order. But let's keep a clean slate for the customer after an order.
    await client.query(removeCartItemsSql, [customer.id]);
    return orderId;
  });
};
