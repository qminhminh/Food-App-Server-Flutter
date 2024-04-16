const router = require('express').Router();
const foodController = require('../controllers/foodController');

// Create a new food
router.post("/", foodController.addFood);

// Get the food by ID
router.get("/:id", foodController.getFoodById);

// Get random food
router.get("/random/:code", foodController.getRandomFood);

// Search foods by category and code
router.get("/search/:search", foodController.searchFoods);

// Get food by category and code
router.get("/:category/:code", foodController.getFoodsByCategoryAndCode);

// Get food by category and code
router.get("/recommendation:code", foodController.getRandomFood);

//  Get food by category and code
router.get("/restaurant-foods/:id", foodController.getFoodsByRestaurant);


module.exports = router;