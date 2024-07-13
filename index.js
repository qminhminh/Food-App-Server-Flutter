const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
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

const PORT = process.env.PORT || 3000;
const DB_URI = process.env.MONGOURL || 'mongodb+srv://hqminh050503:minh050503@cluster0.jc66hin.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
// Connect to MongoDB
mongoose.connect(DB_URI)
.then(() => console.log("Foodly Database Connected"))
.catch((err) => console.log(err));


// 
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to Foodly API');
  });

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
app.listen(PORT,"0.0.0.0", () => console.log(`Foodly Backend is running on ${process.env.PORT}!`));