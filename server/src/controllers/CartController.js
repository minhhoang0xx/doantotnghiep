const CartService = require('../services/CartService')

const createCart = async (req, res) => {
    try { 
        const userId = req.params.userId;
        const response = await CartService.createCart(userId, req.body);
        return res.status(200).json(response);
    } catch (e) {
        console.error('Error in createCart:', e); // Log lỗi
        return res.status(400).json({
            message: e.message || 'An error occurred while creating the cart.'
        });
    }
};
const getCart = async (req, res) => {
    try { 
        const userId = req.params.userId;
        const response = await CartService.getCart(userId);
        return res.status(200).json(response);
    } catch (e) {
        console.error("Error in getCart:", e); // Log chi tiết lỗi
        return res.status(404).json({
            message: e.message || 'An error occurred while fetching the cart.'
        });
    }
}



const updateCart = async (req, res) => {
    try {
        const userId = req.params.userId;
        const { productId, newAmount } = req.body; // Nhận productId và newAmount từ body
        const response = await CartService.updateCartItem(userId, productId, newAmount);
        return res.status(200).json(response);
    } catch (e) {
        console.error('Error in updateCart:', e); // Log lỗi
        return res.status(400).json({
            message: e.message || 'An error occurred while updating the cart item.'
        });
    }
};

const removeCart = async (req, res) => {
    try {
        const userId = req.params.userId;
        const productId = req.params.productId; // Nhận productId từ params
        const response = await CartService.removeCartItem(userId, productId);
        return res.status(200).json(response);
    } catch (e) {
        console.error('Error in removeCart:', e); // Log lỗi
        return res.status(400).json({
            message: e.message || 'An error occurred while removing the cart item.'
        });
    }
};
const deleteCart = async (req, res) => { // khi không còn item nào trong cart
    try {
        const userId = req.params.userId; // Lấy userId từ params
        const response = await CartService.deleteCart(userId); 
        return res.status(200).json(response); 
    } catch (e) {
        console.error('Error in deleteCart:', e);
        return res.status(400).json({
            message: e.message || 'An error occurred while deleting the cart.',
        });
    }
};

module.exports = {
    createCart,
    getCart,
    updateCart,
    removeCart,
    deleteCart
};
