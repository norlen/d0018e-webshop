import { getMultipleRows } from "./connection";

export type Producer = {
  id: string;
  name: string;
};

export const getProducersAll = async () => {
  const sql = `
    SELECT *
    FROM Producer;
    `;
  return await getMultipleRows(sql);
};
