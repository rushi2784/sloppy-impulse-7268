const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());



const connection = require("./config/db");

const weightRoutes = require("./routes/weights.routes");
const foodRouter = require("./routes/foods.routes");
const userController = require("./routes/user.routes")
const authentication = require("./middlewares/authentication")


app.use("/weight", weightRoutes);
app.use("/user", userController)
app.use(authentication)
app.use("/food", foodRouter);



app.get("/", (req, res) => {
  res.send("home page");
});


app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Db connnected");
  } catch (err) {
    console.log("error connecting to db");
    console.log(err);
  }
  console.log("listening on 8080");
});
