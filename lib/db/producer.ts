import { getMultipleRows, getSingleRow } from "./connection";

export type Producer = {
  id: string;
  name: string;
  image_url: string;
  description: string;
  location: string;
  contact: string;
};

export const getProducerById = async (
  id: string
): Promise<Producer | undefined> => {
  const sql = `
    SELECT p.id,
          p.name,
          p.image_url,
          p.description,
          p.location,
          p.contact
    FROM producer AS p
    WHERE p.id = $1;
  `;
  return await getSingleRow(sql, [id]);
};

export const getProducersAll = async () => {
  const sql = `
    SELECT p.id,
           p.name,
           p.image_url,
           p.description,
           p.location,
           p.contact
    FROM producer AS p
    ORDER BY id;
  `;
  return await getMultipleRows(sql);
};
