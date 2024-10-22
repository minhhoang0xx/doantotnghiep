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
                return reject(new Error('Product not found')); // Kiểm tra sản phẩm có tồn tại không
            }

            if (userCart) {
                // Nếu cart đã tồn tại, kiểm tra xem sản phẩm đã có trong cart chưa
                const itemIndex = userCart.cartItems.findIndex((item) => item.product.toString() === productId);

                if (itemIndex > -1) {
                    // Nếu sản phẩm đã có trong cart, cập nhật số lượng
                    userCart.cartItems[itemIndex].amount += amount;
                } else {
                    // Nếu chưa có, thêm sản phẩm mới vào cart
                    userCart.cartItems.push({ product: productId, name, image, price, amount });
                }
            } else {
                // Nếu cart chưa tồn tại, tạo cart mới
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
            console.log('Found cart:', findCart); 
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

module.exports = {
    createCart,
    getCart
};
