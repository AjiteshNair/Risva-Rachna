const {DB_HOST, DB_USER , DB_PASSWORD, DB_DATABASE, DB_PORT}  = require("../utils/helper.js")
const mysql = require("mysql");



const connect = async (companyId,res) =>{

  const db = mysql.createPool({
    connectionLimit: 100,
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    port: DB_PORT
  });

  db.getConnection((err, connection) => {
    console.log(DB_HOST, DB_USER , DB_PASSWORD, DB_DATABASE, DB_PORT)
      if (err) throw err;
    
      //connected to db , perform operations as needed
      console.log("DB connected successful: " + connection.threadId);
  
      const sqlSearch = "SELECT * FROM user WHERE companyId = ?";
      const search_query = mysql.format(sqlSearch, [companyId]);
  
      connection.query(search_query, (err, result) => {
        if (err) throw err;
        if (!result.length) return res.status(404).json({message:"no records found"});
        else res.status(200).json({result});
      
      connection.release();
      });
    });
}
module.exports={
    connect
}