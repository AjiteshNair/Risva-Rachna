const express = require("express");
const mongoose = require("mongoose");
// const LoginServiceObject  = require("./services/loginService.js");

const app = express();
app.use(express.json());
const port = 3000;

// //mysql connection ==================================>>>>>
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

app.post("/mysql", (req,res)=>{
  const companyId = req.body.companyId;
  console.log(companyId);

  db.getConnection( (err, connection)=> {
    if (err) throw (err)

    //connected to db , perform operations as needed
    console.log ("DB connected successful: " + connection.threadId)

    const sqlSearch = "SELECT * FROM user WHERE companyId = ?";
    const search_query = mysql.format(sqlSearch,[companyId])

    connection.query(search_query , (err,result)=>{
      if(err) throw(err);
      if(!result.length)
        console.log("no records found");
      else
        console.log(result);
    connection.release();
    })
  })

})

//<<<<<<=========================================================================================

// =================================================> For mongodb connection

// const url = "mongodb+srv://root:root@urlshortner.uwmkrzq.mongodb.net/";

// mongoose
//   .connect(url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("Error connecting to MongoDB", err));

// // <====================================================================== Mongodb connected

// const regexUser = /^[a-zA-Z0-9]{6,12}$/;
// const regexPassword = /^[\w\s#]{6,}$/;

// let _userModel;
// const getUserModel = () => {
//   if (_userModel) return _userModel;

//   const userSchema = new mongoose.Schema({
//     user: String,
//     password: String,
//   });

//   _userModel = mongoose.model("login", userSchema);
//   return _userModel;
// };

// // Login route
// app.post("/login", async (req, res) => {
//   const { username, password } = req.body;

//   // Username validation
//   const validUsername = regexUser.test(username);
//   //password validation
//   const validPassword = regexPassword.test(password);

//   let error = false;
//   if (!validUsername)
//     error = "username to contain alphanumeric with length 6-12";
//   else if (!validPassword) error = "password must be 6 chars or more";

//   if (error)
//     return res
//       .status(400)
//       .json({ error, status: false, message: "Invalid Entry" });
//   // Checking if user exists

//   const User = getUserModel();
//   const userExists = await User.findOne({ user: username });

//   let message = false,
//     data = false;

//   if (userExists) {
//     if (userExists.password == password) {
//       message = "logged in";
//       data = userExists;
//       console.log(`logged in! Welcome ${username}`);
//       //return res.status(200).json({ status:true , message: 'Logged In' });
//     } else message = "incorrect credentials";
//   } else message = "no such user exists";

//   return res.status(200).json({ error, status: !!data, data, message });
// });

// const taskARoutes = require('./taskA.js')

// taskARoutes(app);



app.listen(port, () => console.log(`Server listening on port ${port}`));
