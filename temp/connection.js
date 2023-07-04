const mysql = require("mysql")

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
   port: DB_PORT
})

// app.post("/mysql", (req,res)=>{
    
// })
db.getConnection( (err, connection)=> {
  if (err) throw (err)

  //connected to db , perform operations as needed
  console.log ("DB connected successful: " + connection.threadId)
  
  
})

export default db;
