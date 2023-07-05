const express = require("express");
const mysql = require("mysql");

const app = express();
app.use(express.json());
const port = 3000;

// //mysql connection ==================================>>>>>

const DB_HOST = "127.0.0.1";
const DB_USER = "root";
const DB_PASSWORD = "root";
const DB_DATABASE = "risvarachna";
const DB_PORT = 3306;

const db = mysql.createPool({
  connectionLimit: 100,
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: DB_PORT,
});

app.post("/mysql", (req, res) => {
  const companyId = req.body.companyId;
  if(!Number(companyId))
    return res.status(400).json({message: "Expected companyId type to be integer"});

  db.getConnection((err, connection) => {
    if (err) throw err;

    //connected to db , perform operations as needed
    console.log("DB connected successful: " + connection.threadId);

    const sqlSearch = "SELECT * FROM user WHERE companyId = ?";
    const search_query = mysql.format(sqlSearch, [companyId]);

    connection.query(search_query, (err, result) => {
      if (err) throw err;
      if (!result.length) console.log("no records found");
      else console.log(result);
      connection.release();
    });
  });
});

app.listen(port, () => console.log(`Server listening on port ${port}`));