import { Database } from "bun:sqlite";

const db = new Database("store.sqlite");

// count all users
// interface UserCount {
// 	count: number;
// }
// const userCount = db
// 	.query("SELECT COUNT(*) as count FROM users")
// 	.get() as UserCount;
// console.log(`Total users: ${userCount.count}`);

export const queryDB = async (sqlQuery: string) => {
  const result = db.query(sqlQuery).all();
  return result;
}