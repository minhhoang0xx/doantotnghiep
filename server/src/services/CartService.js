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

            console.log('Saving cart:', userCart); // Log cart trước khi lưu
            await userCart.save();
            console.log('Cart saved successfully'); // Log sau khi lưu
            resolve(userCart);
        } catch (e) {
            console.error('Error creating cart:', e); // Log lỗi
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
            })
        } catch (e) {
            reject(e); // Trả về lỗi nếu có vấn đề xảy ra
        }
    });
};

module.exports = {
    createCart,
    getCart
};
