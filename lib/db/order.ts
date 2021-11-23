import createClient from "./createClient";

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
  quantity: number;
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
  const client = createClient();
  let orders = [];
  try {
    await client.connect();
    const res = await client.query(sql, [userid]);
    if (res.rows.length > 0) {
      orders = res.rows;
      for (let i = 0; i < orders.length; i++) {
        orders[i].items = [];
      }
    }
  } catch (err) {
    console.error("ERROR getAllOrders:", err);
  } finally {
    await client.end();
  }
  return orders;
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
  const client = createClient();
  let orders = [];
  try {
    await client.connect();
    const res = await client.query(sql);
    if (res.rows.length > 0) {
      orders = res.rows;
      for (let i = 0; i < orders.length; i++) {
        orders[i].items = [];
      }
    }
  } catch (err) {
    console.error("ERROR getAllOrders:", err);
  } finally {
    await client.end();
  }
  return orders;
};

export const getOrderById = async (id: string): Promise<Order> => {
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

  const client = createClient();
  let order = undefined;
  try {
    await client.connect();
    const res = await client.query(sql, [id]);
    if (res.rows.length > 0) {
      order = res.rows[0];
      order.items = [];
    }
  } catch (err) {
    console.error("ERROR getOrderById:", err);
  } finally {
    await client.end();
  }
  return order;
};

export const getOrderItems = async (orderId: string): Promise<OrderItem[]> => {
  const sql = `
  SELECT p.name,
         c.name AS category,
         pr.name AS producer,
         o.price,
         o.quantity,
         p.image_url AS imageUrl
  FROM order_products AS o
    INNER JOIN products AS p ON p.id = o.product_id
    INNER JOIN category AS c ON c.id = p.category_id
    INNER JOIN producer AS pr ON pr.id = p.producer_id
  WHERE o.order_id = $1;
  `;

  const client = createClient();
  let items = [];
  try {
    await client.connect();
    const res = await client.query(sql, [orderId]);
    items = res.rows;
  } catch (err) {
    console.error("ERROR getitemsById:", err);
  } finally {
    await client.end();
  }
  return items;
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
  quantity: number;
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

  let orderId = undefined;
  const client = createClient();
  try {
    await client.connect();

    // To ensure a consistent state, we have to make sure these are all done inside a transaction.
    //
    // There's quite a few RTTs here, we could remedy all this by creating a function in the database
    // which does all of this for us, but let's keep this sane, this is perfectly fine for our use case.
    await client.query("BEGIN");

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
        item.quantity,
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

    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
  } finally {
    await client.end();
  }
  return orderId;
};
