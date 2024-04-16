const router = require('express').Router();
const categoryController = require('../controllers/categoryController');

// Create a new category
router.post("/", categoryController.createCategory);

// Get all categories
router.get("/", categoryController.getAllCategories);

// Get category random categories
router.get("/random", categoryController.getRandomCategories);

module.exports = router;