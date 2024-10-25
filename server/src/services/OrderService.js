const Order = require("../models/OrderModel");
const Product = require("../models/ProductModel")
// const EmailService = require("./")
const createOrder = (userId, newOrder) => {
    return new Promise(async (resolve, reject) => {
        const { orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, totalPrice, email } = newOrder;
        try {
            const promises = orderItems.map(async (order) => {
                const productData = await Product.findOneAndUpdate(
                    {
                        _id: order.product,
                        countInStock: { $gte: order.amount }
                    },
                    {
                        $inc: {
                            countInStock: -order.amount,
                            selled: +order.amount
                        }
                    },
                    { new: true }
                );
                if (productData) {
                    return { status: 'OK', message: 'SUCCESS' };
                } else {
                    return { status: 'ERR', message: 'Insufficient stock', id: order.product };
                }
            });
            const results = await Promise.all(promises);
            const outOfStockItems = results.filter(item => item.status === 'ERR');
            if (outOfStockItems.length) {
                const arrId = outOfStockItems.map(item => item.id);
                return resolve({
                    status: 'ERR',
                    message: `Insufficient stock for products with ids: ${arrId.join(', ')}`
                });
            }
            console.log(shippingAddress)
            const createdOrder = await Order.create({
                orderItems,
                shippingAddress ,
                paymentMethod,
                itemsPrice,
                shippingPrice,
                totalPrice,
                user: userId,
                isPaid: false,
                paidAt: Date.now(),
                isDelivered: false,
                deliveredAt: Date.now()
            });

            if (createdOrder) {
                // await EmailService.sendEmailCreateOrder(email, orderItems);
                resolve({ status: 'OK', message: 'Order created successfully' });
            }
        } catch (e) {
            console.error(e); // Bắt lỗi chi tiết
            reject(e);
        }
    });
};


const getAllOrderDetail = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.find({
                user: id
            }).sort({createdAt: -1, updatedAt: -1})
            if (order === null) {
                resolve({
                    status: 'ERR',
                    message: 'The order is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'SUCESSS',
                data: order
            })
        } catch (e) {
            // console.log('e', e)
            reject(e)
        }
    })
}

const getDetailOrder = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.findById({
                _id: id
            })
            if (order === null) {
                resolve({
                    status: 'ERR',
                    message: 'The order is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'SUCESSS',
                data: order
            })
        } catch (e) {
            // console.log('e', e)
            reject(e)
        }
    })
}

const deleteOrder = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let order = []
            const promises = data.map(async (order) => {
                const productData = await Product.findOneAndUpdate(
                    {
                    _id: order.product,
                    selled: {$gte: order.amount}
                    },
                    {$inc: {
                        countInStock: +order.amount,
                        selled: -order.amount
                    }},
                    {new: true}
                )
                if(productData) {
                    order = await Order.findByIdAndDelete(id)
                    if (order === null) {
                        resolve({
                            status: 'ERR',
                            message: 'The order is not defined'
                        })
                    }
                } else {
                    return{
                        status: 'OK',
                        message: 'ERR',
                        id: order.product
                    }
                }
            })
            const results = await Promise.all(promises)
            const newData = results && results[0] && results[0].id
            
            if(newData) {
                resolve({
                    status: 'ERR',
                    message: `San pham voi id: ${newData} khong ton tai`
                })
            }
            resolve({
                status: 'OK',
                message: 'success',
                data: order
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllOrder = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allOrder = await Order.find().sort({createdAt: -1, updatedAt: -1})
            resolve({
                status: 'OK',
                message: 'Success',
                data: allOrder
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createOrder,
    getDetailOrder,
    deleteOrder,
    getAllOrder
}