import { getMultipleRows, getSingleRow } from "./connection";

export type Producer = {
  id: string;
  name: string;
  image_url: string;
};

export const getProducerById = async (
  id: string
): Promise<Producer | undefined> => {
  const sql = `
  SELECT *
  FROM Producer
  WHERE id=$1;`;
  return await getSingleRow(sql, [id]);
};

export const getProducersAll = async () => {
  const sql = `
    SELECT *
    FROM Producer;
    `;
  return await getMultipleRows(sql);
};
