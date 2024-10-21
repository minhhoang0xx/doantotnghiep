const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController')
const { authAdminMiddleware } = require('../middleware/authMiddleware');

router.post('/createProduct',ProductController.createProduct);
router.post('/logout', ProductController.logOut);
router.put('/updateProduct/:id', ProductController.updateProduct)
router.delete('/deleteProduct/:id', ProductController.deleteProduct)// :id la dinh truyen dong
router.get('/getAllProduct', ProductController.getAllProduct)
router.get('/detailProduct/:id', ProductController.detailProduct)
router.post('/refreshToken', ProductController.refreshToken)
router.get('/searchProduct', ProductController.searchProduct);

module.exports = router