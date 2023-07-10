const express = require("express");
const userController = require("./controller/userController.js")

const app = express();
app.use(express.json());
const port = 3000;

userController(app);

app.listen(port, () => console.log(`Server listening on port ${port}`));