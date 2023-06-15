const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const connectToMongo = require("./config/db");
const { port } = require("./config/constants");
const { errorHandler, notFound } = require("./middlewares/errorHandler");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server listening at port ${port}`);
});
connectToMongo();
