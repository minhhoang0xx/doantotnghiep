const ProductService = require('../services/ProductService.js');


const createProduct = async (req,res)=>{
    try{
        const {name,image,type,price,countInStock,rating,description} = req.body
        if(!name || !image || !type || !price || !countInStock){
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
        const product = req.params.id
        const data = req.body
        if(!product){
            return res.status(200).json({
                status: 'ERR',
                message: 'The Product ID is required'
            })
        }
        const response = await ProductService.updateProduct(product,data) // response de khac voi thang res khong bi nham
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
        const product = req.params.id
        if(!product){
            return res.status(200).json({
                status: 'ERR',
                message: 'The Product ID is required'
            })
        }
        const response = await ProductService.deleteProduct(product) // response de khac voi thang res khong bi nham
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
        const product = req.params.id
        if(!product){
            return res.status(200).json({
                status: 'ERR',
                message: 'The Product ID is required'
            })
        }
        const response = await ProductService.detailProduct(product) // response de khac voi thang res khong bi nham
        return res.status(200).json(response) 
    }catch(e){
        return res.status(404).json({ 
            status: 'error0',
            message: e.message,
            error: e
        })
    }
}

const getAllProduct = async (req, res) => {
    try {
        const { limit, page, sort, filter } = req.query;
        const parsedSort = sort ? JSON.parse(sort) : null; 
        const parsedFilter = filter ? JSON.parse(filter) : null; 
        
        const response = await ProductService.getAllProduct(
            Number(limit) || 100, 
            Number(page) || 0, 
            parsedSort, 
            parsedFilter
        );
        return res.status(200).json(response); 
    } catch (e) {
        return res.status(404).json({ 
            status: 'error',
            message: e.message,
            error: e
        });
    }
};

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

const searchProduct = async (req, res) => {
    const { keyword } = req.query;
    try {
        const products = await ProductService.searchProduct(keyword);
        res.status(200).json(products);
    } catch (error) {
        console.error('Error searching products:', error);
        res.status(500).json({ message: 'Error searching products', error });
    }
};
module.exports = {
    createProduct,
    logOut,
    updateProduct,
    deleteProduct,
    getAllProduct,
    detailProduct,
    refreshToken,
    searchProduct
}