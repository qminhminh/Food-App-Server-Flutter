const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');
const CategoryRoute = require('./routes/category');
const RestaurantRoute = require("./routes/restaurant")
dotenv.config();


// Connect to MongoDB
mongoose.connect(process.env.MONGOURL)
.then(() => console.log("Foodly Database Connected"))
.catch((err) => console.log(err));

// 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));

// Category routes
app.use("/api/category", CategoryRoute);
// Restaurant routes
app.use("/api/restaurant", RestaurantRoute);


// Listen to port
app.listen(process.env.PORT || 3000, () => console.log(`Foodly Backend is running on ${process.env.PORT}!`));