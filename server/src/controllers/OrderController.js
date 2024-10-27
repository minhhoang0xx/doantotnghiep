const OrderService = require('../services/OrderService')

const createOrder = async (req, res) => {
    try {
        const userId = req.params.userId
        const { orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, totalPrice } = req.body
        // if (!paymentMethod || !itemsPrice || !shippingPrice || !totalPrice ||!shippingAddress) {
        //     return res.status(200).json({
        //         status: 'ERR',
        //         message: 'The input is required'
        //     })
        // }
        const response = await OrderService.createOrder(userId, req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getUserOrder = async (req, res) => {
    try {
        const userId = req.params.userId
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required'
            })
        }
        const response = await OrderService.getUserOrder(userId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailOrder = async (req, res) => {
    try {
        const orderId = req.params.orderId
        if (!orderId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required'
            })
        }
        const response = await OrderService.getDetailOrder(orderId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteOrder = async (req, res) => {
    try {
        const data = req.body.orderItems;
        const orderId = req.params.orderId
        if (!orderId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The orderId is required'
            })
        }
        const response = await OrderService.deleteOrder(orderId, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e,
            status: 'ERRoooii',
        })
    }
}

const getAllOrder = async (req, res) => {
    try {
        const data = await OrderService.getAllOrder()
        return res.status(200).json(data)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createOrder,
    getUserOrder,
    getDetailOrder,
    deleteOrder,
    getAllOrder
}
