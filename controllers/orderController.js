const Order = require('../models/Order');

module.exports = {
    placeOrder: async (req, res) => {
        const newOrder = new Order(req.body);

        try {
            await newOrder.save();

            const orderId = newOrder._id;
            res.status(201).json({ status: true, message: "Order placed successfully", orderId: orderId });
        } catch (error) {
            res.status(500).json({ status: true, message: error.message });
        }
    },

    getUserOrders: async (req, res) => {
        const userId = req.user.id;
        const { paymentStatus, orderStatus } = req.query;

        let query = { userId };

        if (paymentStatus) {
            query.paymentStatus = paymentStatus;
        }

        if (orderStatus) {
            query.orderStatus = orderStatus;
        }


        try {
            const orders = await Order.find(query)
                .populate({
                    path: 'orderItems.foodId',
                    select: "imageUrl title rating time"
                })

            res.status(200).json(orders)
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },

    getRestaurantOrder: async (req, res) => {
        const id = req.params.id;
        const status = req.params.status;


        try {
            const orders = await Order.find({ orderStatus: status, paymentStatus: 'Completed', restaurantId: id })
                .select('userId deliveryAddress orderItems deliveryFee restaurantId restaurantCoords recipientCoords orderStatus')
                .populate({ 
                    path: 'userId',
                    select: 'phone profile'
                }).populate({
                    path: "restaurantId",
                    select: "title coords imageUrl logoUrl time"
                 }).populate({
                    path: 'orderItems.foodId',
                    select: "title imageUrl time"
                 }).populate({
                    path: 'deliveryAddress',
                    select: "addressLine1"
                 })

                 res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });     
        }
    },

    updateOrderStatus: async (req, res) => {
        const orderId = req.params.id;
        const orderStatus = req.query.status;
        try {
            

            const updatedOrder =  await Order.findByIdAndUpdate(orderId, {orderStatus: orderStatus}, {new: true});

            if(updatedOrder){
                res.status(200).json({status: true, message: "Order updated successfully"})
            }else{
                res.status(404).json({status: false, message: "Order not found"})  
            }
        } catch (error) {
            res.status(404).json({status: false, message: error.message}) 
        }
    },

    getOrderDetails: async (req, res) => {
        const orderId = req.params.id;

        try {
            const order = await Order.findById(orderId)
                .select('userId deliveryAddress orderItems deliveryFee restaurantId restaurantCoords recipientCoords orderStatus')
                .populate({ 
                    path: 'userId',
                    select: 'phone profile'
                }).populate({
                    path: "restaurantId",
                    select: "title coords imageUrl logoUrl time"
                 }).populate({
                    path: 'orderItems.foodId',
                    select: "title imageUrl time"
                 }).populate({
                    path: 'deliveryAddress',
                    select: "addressLine1"
                 })

                 res.status(200).json(order);
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });     
        }
    },

    updatePaymentStatusSuccess: async (req, res) => {
        const orderId = req.params.id;

        try{
            const updatedOrder = await Order.findByIdAndUpdate(
                orderId,
                { orderStatus: 'Placed', paymentStatus: 'Completed' }, // Đối tượng cập nhật
                { new: true } // Tùy chọn để trả về tài liệu đã cập nhật
            );

            if(updatedOrder){
                res.status(200).json({status: true, message: "Order updated successfully"})
            }else{
                res.status(404).json({status: false, message: "Order not found"})  
            }
        }catch(e){
            res.status(500).json({ status: false, message: error.message });     
        }
    },

    updatePaymentStatusFalse: async (req, res) => {
        const orderId = req.params.id;

        try{
            const updatedOrder = await Order.findByIdAndUpdate(
                orderId,
                { orderStatus: 'Pending', paymentStatus: 'Failed' }, // Đối tượng cập nhật
                { new: true } // Tùy chọn để trả về tài liệu đã cập nhật
            );

            if(updatedOrder){
                res.status(200).json({status: true, message: "Order updated successfully"})
            }else{
                res.status(404).json({status: false, message: "Order not found"})  
            }
        }catch(e){
            res.status(500).json({ status: false, message: error.message });     
        }
    }




}