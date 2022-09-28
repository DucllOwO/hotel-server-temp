const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const { popularProducts } = require("./data");
const Product = require("./models/Product");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfully!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
// parse json to object on req
app.use(express.json());
app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/products", productRoute);
app.use("/carts", cartRoute);
app.use("/orders", orderRoute);
app.use("/checkout", stripeRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
  // Product.insertMany(popularProducts, { ordered: false }, (err, product) => {
  //   if (err)
  //     console.log(err);
  // })

  // Product.deleteMany({ }).then(() => {
  //   console.log("data delete")
  // }).catch(() => {
  //   console.log('data dont delete')
  // });
});
