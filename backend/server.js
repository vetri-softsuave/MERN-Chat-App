const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const connectToMongo = require("./config/db");
const errorHandler = require('./middlewares/errorHandler')
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json());
app.use("/api/user", userRoutes);
app.use(errorHandler)

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`server listening at port ${port}`);
});
connectToMongo();
