const express = require('express');
const app = express();
const cors = require('cors');
const port = 5001; // Choose any available port
const connectDb = require("./config/dbConnection");
const dotenv= require("dotenv").config();
const bodyParser = require('body-parser');

connectDb();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/ocr", require("./routes/recordRoutes"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
