const Cart = require("../models/CartModel");
const Product = require('../models/ProductModel');


const createCart = (userId, data) => {
    return new Promise(async (resolve, reject) => {
        const { productId, name, image, price, amount } = data;
        try {
            // Tìm cart theo user
            let userCart = await Cart.findOne({ user: userId });
            const product = await Product.findById(productId);

            if (!product) {
                return reject(new Error('Product not found'));
            }

            if (userCart) { // co cart roi
               // check xem san pham da co chua
                const itemIndex = userCart.cartItems.findIndex((item) => item.product.toString() === productId);

                if (itemIndex > -1) {
                    // neu co roi thi + amount
                    userCart.cartItems[itemIndex].amount += amount;
                } else {
                    // neu chua co thi tao. moi'
                    userCart.cartItems.push({ product: productId, name, image, price, amount });
                }
            } else {
                // tao cart moi neu truoc do chua co
                userCart = new Cart({
                    user: userId,
                    cartItems: [{ product: productId, name, image, price, amount }],
                });
            }
            console.log('Saving cart:', userCart); 
            await userCart.save();
            console.log('Cart saved successfully'); 
            resolve(userCart);
        } catch (e) {
            console.error('Error creating cart:', e); 
            reject(e);
        }
    });
};
const getCart = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const findCart = await Cart.findOne({ user: userId });
            resolve({
                status: 'OK',
                message: 'success',
                data: findCart
            });
        } catch (e) {
            console.error("Error fetching cart:", e); 
            reject(e); 
        }
    });
};

const updateCartItem = (userId, productId, newAmount) => {
    return new Promise(async (resolve, reject) => {
        try {
            const userCart = await Cart.findOne({ user: userId });
            if (!userCart) {
                return reject(new Error('Cart not found'));
            }
            // tim kiem vị trí của sản phẩm trong giỏ hàng
            const itemIndex = userCart.cartItems.findIndex(item => item.product.toString() === productId);
            if (itemIndex === -1) {
                return reject(new Error('Product not found in cart'));
            }

            //update amount
            const oldAmount = userCart.cartItems[itemIndex].amount;
            userCart.cartItems[itemIndex].amount = newAmount;

            // update total
            userCart.totalPrice += userCart.cartItems[itemIndex].price * (newAmount - oldAmount);

            await userCart.save();
            resolve(userCart);
        } catch (e) {
            console.error('Error updating cart item:', e);
            reject(e);
        }
    });
};

const removeCartItem = (userId, productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const userCart = await Cart.findOne({ user: userId });
            if (!userCart) {
                return reject(new Error('Cart not found'));
            }

            const itemIndex = userCart.cartItems.findIndex(item => item.product.toString() === productId);
            if (itemIndex === -1) {
                return reject(new Error('Product not found in cart'));
            }
            // tinh lai total
            userCart.totalPrice -= userCart.cartItems[itemIndex].price * userCart.cartItems[itemIndex].amount;
           // delete
            userCart.cartItems.splice(itemIndex, 1);

            await userCart.save();
            resolve(userCart);
        } catch (e) {
            console.error('Error removing cart item:', e);
            reject(e);
        }
    });
};
const deleteCart = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Xóa giỏ hàng của người dùng
            await Cart.deleteOne({ user: userId });
            resolve({ message: 'Cart deleted successfully' });
        } catch (e) {
            console.error('Error deleting cart:', e);
            reject(new Error('Failed to delete cart'));
        }
    });
};

module.exports = {
    createCart,
    getCart,
    updateCartItem,
    removeCartItem,
    deleteCart
};