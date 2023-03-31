const mysql = require("mysql2/promise");
const config = require("../configs/db");

async function query(sql, ...params) {
  try {
    const connection = await mysql.createConnection(config);
    const [result] = await connection.query(sql, params);

    return result;
  } catch (error) {
    console.error("SQL SERVICE ERROR", error);
    throw error;
  }
}

module.exports = { query };
