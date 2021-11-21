import create_client from "./create_client";

type CustomerInfo = {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
  address: string;
};

type CreateOrderItem = {
  id: string;
  quantity: number;
};

export const createOrder = async (
  customer: CustomerInfo,
  items: CreateOrderItem[]
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
    p.id = $2;
  `;

  const removeCartItemsSql = `
  DELETE FROM cart
  WHERE
    user_id = $1;
  `;

  let orderId = undefined;
  const client = create_client();
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
    for (let item of items) {
      await client.query(createOrderItemSql, [orderId, item.id, item.quantity]);
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
