const Order = require("../models/OrderModel");
const Product = require("../models/ProductModel");
 const EmailService = require("../services/EmailService");
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
            const isPaid = paymentMethod === 'paypal';
           
            const createdOrder = await Order.create({
                orderItems,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                shippingPrice,
                totalPrice,
                user: userId,
                isPaid,
                paidAt: Date.now(),
                isDelivered: false,
                deliveredAt: null 
            });

            if (createdOrder) {
                 //await EmailService.sendEmailCreateOrder(email, orderItems);
                resolve({ status: 'OK', message: 'Order created successfully', orderId: createdOrder._id });
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

const getAllOrder = (sort) => {
    return new Promise(async (resolve, reject) => {
        try {
            const total = await Order.countDocuments(); // Đếm tổng số sản phẩm
            if (sort && sort[1]) {
                const objectSort = {};
                objectSort[sort[1]] = sort[0]; // sort[0] là thứ tự, sort[1] là trường sắp xếp
                const allOrderSort = await Order.find().sort(objectSort);

                return resolve({
                    status: 'OK',
                    message: 'All product list (sorted)',
                    data: allOrderSort,
                    total: total,
                });
            }
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

const doneOrder = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const doneOrder = await Order.findByIdAndDelete(id);
            if (!doneOrder) {
                resolve({
                    status: 'ERR',
                    message: 'The order does not exist.',
                });
            } else {
                resolve({
                    status: 'OK',
                    message: 'Order deleted successfully',
                    data: doneOrder,
                });
            }
        } catch (e) {
            console.error('Error in deleteOrder:', e.message);
            reject(e);
        }
    });
};

const updateOrderStatus = (id,data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkOrder = await Order.findOne({
                _id : id, // truy van cua mongoDB phair laf _id
            })
            console.log(checkOrder)
            if(checkOrder === null){
                resolve({
                    status: 'error',
                    message: 'the User is not Defined',
                })
            }
            if (data.isDelivered === true) {
                data.deliveredAt = Date.now();
            }
            const updateOrderStatus = await Order.findByIdAndUpdate(id, data, {new: true})
            resolve ({
                status: 'OK',
                message: 'succes',
                data: updateOrderStatus
            })
        }catch(err){
            reject(err);
        }
    })
    
}
module.exports = {
    createOrder,
    getDetailOrder,
    getUserOrder,
    deleteOrder,
    getAllOrder,
    doneOrder,
    updateOrderStatus

}