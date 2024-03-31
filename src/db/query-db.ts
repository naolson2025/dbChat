import { Database } from "bun:sqlite";

const db = new Database("store.sqlite");

export const queryDB = async (sqlQuery: string) => {
  const result = db.query(sqlQuery).all();
  return result;
}