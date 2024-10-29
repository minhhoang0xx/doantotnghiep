const express = require("express");
const router = express.Router()
const OrderController = require('../controllers/OrderController');
const { authUserMiddleWare, authMiddleWare } = require("../middleware/authMiddleware");

router.post('/createOrder/:userId', OrderController.createOrder)
router.get('/UserOrder/:userId', OrderController.getUserOrder)
router.get('/detailOrder/:orderId', OrderController.getDetailOrder)
router.delete('/deleteOrder/:orderId', OrderController.deleteOrder)
router.get('/getAllOrder', OrderController.getAllOrder)
router.delete('/doneOrder/:id', OrderController.doneOrder)
router.put('/updateOrderStatus/:id', OrderController.updateOrderStatus)
module.exports = router