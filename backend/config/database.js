import mysql from "mysql2";
import {} from "dotenv/config.js";

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

export default db;
