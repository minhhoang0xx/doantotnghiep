const mongoose = require('mongoose')
const orderSchema = new mongoose.Schema({

    shippingAddress: {
        fullname: { type: String, required: true },
        address: { type: String, required: true },
        phone: { type: Number, required: true },
    },
    orderItems: [
        {
            name: { type: String, required: true },
            amount: { type: Number, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
        }
    ],
    paymentMethod: { type: String, required: true },
    itemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    totalPrice: { type: Number, require: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isPaid: { type: Boolean, required: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, required: false },
    deliveredAt: { type: Date },
},
    {
        timeseries: true,
    }
);

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;