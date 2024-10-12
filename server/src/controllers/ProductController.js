const ProductService = require('../services/ProductService.js');


const createProduct = async (req,res)=>{
    try{
        const {name,image,type,price,countInStock,rating,description} = req.body
        if(!name || !image || !type || !price || !countInStock || !rating ){
            return res.status(200).json({
                status: 'error',
                message: 'the input is invalid'
            })
        }
        const response = await ProductService.createProduct(req.body) // response de khac voi thang res khong bi nham
        return res.status(200).json(response) 
    }catch(e){
        return res.status(404).json({ 
            status: 'error0',
            message: e.message,
            error: e
        })
    }
}
//////

const logOut = (req, res) => {
    try {
        return res.status(200).json({
            status: 'OK',
            message: 'Logout successful'
        });
    } catch (e) {
        return res.status(500).json({
            status: 'error',
            message: 'Something went wrong',
            error: e.message
        });
    }
}

const updateProduct = async (req,res)=>{
    try{
        const productId = req.params.id
        const data = req.body
        if(!productId){
            return res.status(200).json({
                status: 'ERR',
                message: 'The Product ID is required'
            })
        }
        const response = await ProductService.updateProduct(productId,data) // response de khac voi thang res khong bi nham
        return res.status(200).json(response) 
    }catch(e){
        return res.status(404).json({ 
            status: 'error0',
            message: e.message,
            error: e
        })
    }
}

const deleteProduct = async (req,res)=>{
    try{
        const productId = req.params.id
        if(!productId){
            return res.status(200).json({
                status: 'ERR',
                message: 'The Product ID is required'
            })
        }
        const response = await ProductService.deleteProduct(productId) // response de khac voi thang res khong bi nham
        return res.status(200).json(response) 
    }catch(e){
        return res.status(404).json({ 
            status: 'error0',
            message: e.message,
            error: e
        })
    }
}

const detailProduct = async (req,res)=>{
    try{
        const productId = req.params.id
        if(!productId){
            return res.status(200).json({
                status: 'ERR',
                message: 'The Product ID is required'
            })
        }
        const response = await ProductService.detailProduct(productId) // response de khac voi thang res khong bi nham
        return res.status(200).json(response) 
    }catch(e){
        return res.status(404).json({ 
            status: 'error0',
            message: e.message,
            error: e
        })
    }
}

const getAllProduct = async (req,res)=>{
    try{
        /////////////////////////
        const {limit,page, sort, filter} = req.query
        //////////////////////////
        const response = await ProductService.getAllProduct(Number(limit) || 8, Number(page) || 0, sort, filter) // response de khac voi thang res khong bi nham
        return res.status(200).json(response) 
    }catch(e){
        return res.status(404).json({ 
            status: 'error0',
            message: e.message,
            error: e
        })
    }
}

const refreshToken = async (req,res)=>{
    try{
        const token = req.headers.token.split(' ')[1]
        if(!token){
            return res.status(200).json({
                status: 'ERR',
                message: 'The token is required'
            })
        }
        const response = await JwtService.refreshTokenJwt(token) // response de khac voi thang res khong bi nham
        return res.status(200).json(response) 
    }catch(e){
        return res.status(404).json({ 
            status: 'error1',
            message: e.message,
        })
    }
}
module.exports = {
    createProduct,
    logOut,
    updateProduct,
    deleteProduct,
    getAllProduct,
    detailProduct,
    refreshToken
}