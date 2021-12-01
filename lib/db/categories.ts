import { getMultipleRows } from "./connection";

export type Category = {
  id: string;
  name: string;
};

export const getCategoriesAll = async () => {
  const sql = `
    SELECT * FROM Category;
    `;
  return await getMultipleRows(sql);
};
