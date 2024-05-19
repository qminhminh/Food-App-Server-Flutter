const router = require('express').Router();
const orderController = require('../controllers/orderController');
const {verifyTokenAndAuthorization} = require('../middleware/verifyToken');

router.post("/",verifyTokenAndAuthorization, orderController.placeOrder);

router.get("/:id",verifyTokenAndAuthorization, orderController.getOrderDetails);

router.get("/",verifyTokenAndAuthorization, orderController.getUserOrders);

router.get("/rest-orders/:id/:status",verifyTokenAndAuthorization, orderController.getRestaurantOrder);

router.put("/update/:id",verifyTokenAndAuthorization, orderController.updateOrderStatus);

router.put("/update-payment-status-success/:id",verifyTokenAndAuthorization, orderController.updatePaymentStatusSuccess);

router.put("/update-payment-status-false/:id",verifyTokenAndAuthorization, orderController.updatePaymentStatusSuccess);


module.exports = router;