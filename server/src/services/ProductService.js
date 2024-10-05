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

const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const {email,password} = userLogin
       
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if(checkUser === null){
                resolve({
                    status: 'error',
                    message: 'the User is not Defined',
                })
            }
           const comparePassword = bcrypt.compareSync(password, checkUser.password)
            
            if(!comparePassword) {
                resolve({
                    status: 'OK',
                    message: 'The password or user is not true'
                })
            }

            const access_token = await generalAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin,
            })
            const refresh_token = await generalRefreshToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin,
            })

            resolve ({
                status: 'OK',
                message: 'succes',
                access_token,
                refresh_token
            })
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

const deleteProduct= (id) => {
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
            //await Product.findByIdAndDelete(id)
            resolve ({
                status: 'OK',
                message: 'deleted',
            })
        }catch(err){
            reject(err);
        }
    })
    
}

const getAllProduct = (limit, page, sort, filter) => {// gioi han so san pham trong 1 trang, skip la bo qua bnh sp theo thu tu
    return new Promise(async (resolve, reject) => {
        try {
            const total = await Product.countDocuments()// mongo bat phai the
            if(filter){
                const label =filter[0]
                const allObjectFilter = await Product.find({[label]: {'$regex': filter[1]}}).limit(limit).skip(page*limit)
                //$regex la de filter theo tu khoa lien quan nhat
                //[label] phai de nhu nay neu khong no se khong kieu label la 1 cai key
                resolve ({
                    status: 'OK',
                    message: 'Filter list',
                    data: allObjectFilter,
                    total: total,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(total / limit)
                })
            }
            if(sort){
                const objectSort ={}
                objectSort[sort[1]] = sort[0]
                const allProductSort = await Product.find().limit(limit).skip(page*limit).sort(objectSort)
                resolve ({
                    status: 'OK',
                    message: 'all product list',
                    data: allProductSort,
                    total: total,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(total / limit)
                })
            }
            const allProduct = await Product.find().limit(limit).skip(page*limit).sort({
                price: sort
            })
            
            resolve ({
                status: 'OK',
                message: 'all product list',
                data: allProduct,
                total: total,
                pageCurrent: Number(page + 1),
                totalPage: Math.ceil(total / limit)
            })
        }catch(err){
            reject(err);
        }
    })
    
}

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
    loginUser,
    updateProduct,
    deleteProduct,
    getAllProduct,
    detailProduct,

}