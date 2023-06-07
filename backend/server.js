const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`server listening at port ${port}`);
});
