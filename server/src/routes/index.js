const UserRouter = require('./UserRouter');
const ProductRouter = require('./ProductRouter');
const CartRouter = require('./CartRouter');
const OrderRouter = require('./OrderRouter');
const PaymentRouter = require('./PaymentRouter');

const routes = (app) =>{
    app.use('/api/user', UserRouter) 
    app.use('/api/product', ProductRouter) 
    app.use('/api/cart', CartRouter) 
    app.use('/api/order', OrderRouter) 
    app.use('/api/payment', PaymentRouter)  
}
module.exports = routes