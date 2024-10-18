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
            const total = await Product.countDocuments(); // Đếm tổng số sản phẩm

            if (filter) {
                const label = filter[0];
                const allObjectFilter = await Product.find({ [label]: { '$regex': filter[1], '$options': 'i' } })
                    .limit(limit)
                    .skip(page * limit); // $regex để lọc theo từ khóa liên quan nhất
                // [label] phải để như vậy nếu không sẽ coi label là key trực tiếp

                return resolve({
                    status: 'OK',
                    message: 'Filter list',
                    data: allObjectFilter,
                    total: total,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(total / limit)
                });
            }

            if (sort && sort[1]) {
                const objectSort = {};
                objectSort[sort[1]] = sort[0]; // sort[0] là thứ tự, sort[1] là trường sắp xếp
                const allProductSort = await Product.find()
                    .limit(limit)
                    .skip(page * limit)
                    .sort(objectSort);

                return resolve({
                    status: 'OK',
                    message: 'All product list (sorted)',
                    data: allProductSort,
                    total: total,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(total / limit)
                });
            }

            // Trường hợp không có filter và sort, chỉ thực hiện phân trang
            const allProduct = await Product.find().limit(limit).skip(page * limit);

            return resolve({
                status: 'OK',
                message: 'All product list',
                data: allProduct,
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


module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProduct,
    detailProduct,

}