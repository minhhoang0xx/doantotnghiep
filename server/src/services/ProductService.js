const { request } = require('express');
const Product = require('../models/ProductModel');
const bcrypt = require('bcrypt');

const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const {name,image,type,price,countInStock,rating,description} = newProduct
        try {
            const checkProduct = await Product.findOne({
                name: name
            })
            if(checkProduct !== null){
                resolve({
                    status: 'OK',
                    message: 'Name already exists',
                })
            }
            const createProduct = await Product.create({
                name,
                image,
                type,
                price,
                countInStock,
                rating,
                description
            })
            if(createProduct) {
                resolve ({
                    status: 'OK',
                    message: 'succes',
                    data: createProduct
                })
            }
        }catch(err){
            reject(err);
        }
    })
    
}


const updateProduct = (id,data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id : id, // truy van cua mongoDB phair laf _id
            })
            console.log(checkProduct)
            if(checkProduct === null){
                resolve({
                    status: 'error',
                    message: 'the Product is not Defined',
                })
            }

            const updatedProduct = await Product.findByIdAndUpdate(id, data, {new: true})
            console.log(updatedProduct)
            resolve ({
                status: 'OK',
                message: 'succes',
                data: updatedProduct
            })
        }catch(err){
            reject(err);
        }
    })
    
}

const deleteProduct= async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id : id, // truy van cua mongoDB phair laf _id
            })
            if(checkProduct === null){
                resolve({
                    status: 'error',
                    message: 'the Product is not Defined',
                })
            }
            await Product.findByIdAndDelete(id)
            resolve ({
                status: 'OK',
                message: 'deleted',
            })
        }catch(err){
            reject(err);
        }
    })
    
}

const getAllProduct = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const total = await Product.countDocuments();
            let query = {};
            
            // Xử lý lọc
            if (filter && filter.length > 0 && filter[1] !== 'all') {
                const label = filter[0];
                const value = filter[1];
                query[label] = { '$regex': value, '$options': 'i' };
                //reget: lay gai tri tuong ung // option : i (khoing phan bien A a)
            }

            // Xử lý sắp xếp
            let sortQuery = {};
            if (sort && sort.length > 0) {
                sortQuery[sort[1]] = sort[0] === 'asc' ? 1 : -1; // Xác định thứ tự sắp xếp
            }

            // Lấy sản phẩm theo filter và sort
            const allProducts = await Product.find(query)
                .limit(limit)
                .skip(page * limit)
                .sort(sortQuery);

            return resolve({
                status: 'OK',
                message: 'All product list',
                data: allProducts,
                total: total,
                pageCurrent: Number(page + 1),
                totalPage: Math.ceil(total / limit)
            });
        } catch (err) {
            reject(err);
        }
    });
};


const detailProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await Product.findOne({
                _id : id, // truy van cua mongoDB phair laf _id
            })
            if(user === null){
                resolve({
                    status: 'error',
                    message: 'the User is not Defined',
                })
            }
            resolve ({
                status: 'OK',
                message: 'User information',
                data: user
            })
        }catch(err){
            reject(err);
        }
    })
    
}
const searchProduct = async (keyword) => {
    try {
        const products = await Product.find({ name: { $regex: keyword, $options: 'i' } });
        return products;
    } catch (error) {
        throw new Error('Error searching products: ' + error.message);
    }
};



module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProduct,
    detailProduct,
    searchProduct

}