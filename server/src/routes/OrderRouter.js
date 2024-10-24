const express = require("express");
const router = express.Router()
const OrderController = require('../controllers/OrderController');
const { authUserMiddleWare, authMiddleWare } = require("../middleware/authMiddleware");

router.post('/createOrder/:id', OrderController.createOrder)
router.get('/getAllOrderDetail/:id', OrderController.getAllOrderDetail)
router.get('/detailOrder/:id', OrderController.getDetailOrder)
router.delete('/deleteOrder/:id', OrderController.deleteOrder)
router.get('/getAllOrder', OrderController.getAllOrder)


module.exports = router