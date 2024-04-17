const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');
const CategoryRoute = require('./routes/category');
const RestaurantRoute = require("./routes/restaurant");
const FoodRoute = require("./routes/food");
const RatingRoute = require("./routes/rating");
const AuthRoute = require("./routes/auth");
const UserRoute = require("./routes/user");
const AddressRoute = require("./routes/address");
const CartRoute = require("./routes/cart");
const OrderRoute = require("./routes/order");

dotenv.config();


// Connect to MongoDB
mongoose.connect(process.env.MONGOURL)
.then(() => console.log("Foodly Database Connected"))
.catch((err) => console.log(err));


// 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));

// auth routes
app.use("/", AuthRoute);
//user routes
app.use("/api/users", UserRoute);
// Category routes
app.use("/api/category", CategoryRoute);
// Restaurant routes
app.use("/api/restaurant", RestaurantRoute);
// Food routes
app.use("/api/foods", FoodRoute);
// Rating routes
app.use("/api/rating", RatingRoute);
// Addresses routes
app.use("/api/address", AddressRoute);
// Cart routes
app.use("/api/cart", CartRoute);
// Order routes
app.use("/api/orders", OrderRoute);

// Listen to port
app.listen(process.env.PORT || 3000, () => console.log(`Foodly Backend is running on ${process.env.PORT}!`));