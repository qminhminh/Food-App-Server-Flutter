const router = require('express').Router();
const orderController = require('../controllers/orderController');
const {verifyTokenAndAuthorization} = require('../middleware/verifyToken');

router.post("/",verifyTokenAndAuthorization, orderController.placeOrder);

router.get("/:id",verifyTokenAndAuthorization, orderController.getOrderDetails);

router.get("/",verifyTokenAndAuthorization, orderController.getUserOrders);

router.get("/rest-orders/:id/:status",verifyTokenAndAuthorization, orderController.getRestaurantOrder);

router.put("/update/:id",verifyTokenAndAuthorization, orderController.updateOrderStatus);

module.exports = router;