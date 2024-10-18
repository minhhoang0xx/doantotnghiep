const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController')
const { authAdminMiddleware } = require('../middleware/authMiddleware');

router.post('/createProduct', authAdminMiddleware,ProductController.createProduct);
router.post('/logout', ProductController.logOut);
router.put('/updateProduct/:id', authAdminMiddleware, ProductController.updateProduct)
router.delete('/deleteProduct/:id', authAdminMiddleware, ProductController.deleteProduct)// :id la dinh truyen dong
router.get('/getAllProduct', ProductController.getAllProduct)
router.get('/detailProduct/:id', ProductController.detailProduct)
router.post('/refreshToken', ProductController.refreshToken)

module.exports = router