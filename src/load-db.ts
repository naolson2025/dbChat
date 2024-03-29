import { Database } from "bun:sqlite";
import { faker } from "@faker-js/faker";

const db = new Database("store.sqlite", { create: true });

// enable WAL mode for high concurrency
db.exec("PRAGMA journal_mode = WAL;");

// create user table
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
  );
`);

// create product table
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL
  );
`);

// create order table
db.exec(`
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(product_id) REFERENCES products(id)
  );
`);

// load 500 fake users
for (let i = 0; i < 500; i++) {
	db.prepare("INSERT INTO users (name, email) VALUES (?, ?)").run(
		faker.person.fullName(),
		faker.internet.email({ allowSpecialCharacters: true }),
	);
}

// load 1000 fake products
for (let i = 0; i < 1000; i++) {
	db.prepare("INSERT INTO products (name, price) VALUES (?, ?)").run(
		faker.commerce.productName(),
		faker.commerce.price(),
	);
}

// load 1000 fake orders
for (let i = 0; i < 1000; i++) {
	db.prepare(
		"INSERT INTO orders (user_id, product_id, quantity) VALUES (?, ?, ?)",
	).run(
		faker.number.int({ min: 1, max: 500 }),
		faker.number.int({ min: 1, max: 1000 }),
		faker.number.int({ min: 1, max: 10 }),
	);
}

db.close();
