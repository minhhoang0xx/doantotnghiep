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



module.exports = {
    createCart,
    getCart
}
