import { getMultipleRows, getSingleRow } from "./connection";

export type Producer = {
  id: string;
  name: string;
  image_url: string;
  description: string;
};

export const getProducerById = async (
  id: string
): Promise<Producer | undefined> => {
  const sql = `
  SELECT p.id,
         p.name,
         p.image_url,
         p.description
  FROM Producer AS p
  WHERE p.id=$1;`;
  return await getSingleRow(sql, [id]);
};

export const getProducersAll = async () => {
  const sql = `
    SELECT p.id,
           p.name,
           p.image_url,
          p.description
    FROM Producer AS p;
    `;
  return await getMultipleRows(sql);
};
