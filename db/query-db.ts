import { Database } from "bun:sqlite";

const db = new Database("store.sqlite");

export const runQuery = async (sqlQuery: string) => {
	const result = db.query(sqlQuery).all();
	return result;
};

export const getColumns = async (table: string) => {
	const result = db.query(`PRAGMA table_info(${table})`).all();
	return result;
};
