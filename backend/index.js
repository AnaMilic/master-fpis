const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const concerts = require("./routes/concerts");
const customers = require("./routes/customers");
const seatingZones = require("./routes/seatingZones");
const tokens = require("./routes/tokens");
const promoCodes = require("./routes/promoCodes");
const reservations = require("./routes/reservations");

const app = express();

app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

const port = 5050;

mongoose
  .connect(
    "mongodb+srv://admin:admin12345@fpis.mgefddv.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

app.use("/api/concerts", concerts);
app.use("/api/customers", customers);
app.use("/api/seatingZones", seatingZones);
app.use("/api/tokens", tokens);
app.use("/api/promoCodes", promoCodes);
app.use("/api/reservations", reservations);

app.listen(port, () => console.log(`Server up and running on port ${port}`));
