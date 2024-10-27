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
                            sold: +order.amount
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
                shippingAddress,
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


const getUserOrder = (userID) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.find({
                user: userID
            }).sort({ createdAt: -1, updatedAt: -1 })
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

const getDetailOrder = (orderId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.findById({
                _id: orderId
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

const deleteOrder = (orderId, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!Array.isArray(data)) {
                throw new Error("Invalid data format: data should be an array.");
            }

            const promises = data.map(async (item) => {
                try {
                    const productData = await Product.findOneAndUpdate(
                        {
                            _id: item.product,
                            sold: { $gte: item.amount }
                        },
                        {
                            $inc: {
                                countInStock: +item.amount,
                                sold: -item.amount
                            }
                        },
                        { new: true }
                    );

                    if (!productData) {
                        throw new Error(`Product with ID ${item.product} does not exist or insufficient stock.`);
                    }
                } catch (error) {
                    console.error(`Error updating product ${item.product}:`, error.message);
                    throw error;
                }
            });

            await Promise.all(promises);

            const deletedOrder = await Order.findByIdAndDelete(orderId);

            if (!deletedOrder) {
                resolve({
                    status: 'ERR',
                    message: 'The order does not exist.',
                });
            } else {
                resolve({
                    status: 'OK',
                    message: 'Order deleted successfully',
                    data: deletedOrder,
                });
            }
        } catch (e) {
            console.error('Error in deleteOrder:', e.message);
            reject(e);
        }
    });
};

const getAllOrder = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allOrder = await Order.find().populate('user', 'name');
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
    getUserOrder,
    deleteOrder,
    getAllOrder
}