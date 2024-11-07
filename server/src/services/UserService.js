const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const { generalAccessToken } = require('./JwtService'); // co dau{} vi no khong phai la mot gia tri don le 
const { generalRefreshToken } = require('./JwtService');

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const {name,email,password,confirmPassword,phone, address, avatar} = newUser
       
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if(checkUser !== null){
                resolve({
                    status: 'null',
                    message: 'Email already exists',
                })
            }
            const hash = bcrypt.hashSync(password, 10)// ma hoa password
            const createUser = await User.create({
                name,
                email,
                password: hash,
                confirmPassword :hash,
                phone,
                address,
                avatar,
            })
            if(createUser) {
                resolve ({
                    status: 'OK',
                    message: 'succes',
                    data: createUser
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
           const comparePassword = await bcrypt.compareSync(password, checkUser.password)
            
            if(!comparePassword) {
                resolve({
                    status: 'Error',
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
            console.log(access_token)
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

const updateUser = (id,data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id : id, // truy van cua mongoDB phair laf _id
            })
            console.log(checkUser)
            if(checkUser === null){
                resolve({
                    status: 'error',
                    message: 'the User is not Defined',
                })
            }

            const updatedUser = await User.findByIdAndUpdate(id, data, {new: true})
            console.log(updatedUser)
            resolve ({
                status: 'OK',
                message: 'succes',
                data: updatedUser
            })
        }catch(err){
            reject(err);
        }
    })
    
}

const deleteUser = async(id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id : id, // truy van cua mongoDB phair laf _id
            })
            if(checkUser === null){
                resolve({
                    status: 'error',
                    message: 'the User is not Defined',
                })
            }
            await User.findByIdAndDelete(id)
            resolve ({
                status: 'OK',
                message: 'deleted',
            })
        }catch(err){
            reject(err);
        }
    })
    
}

const getAllUser = (limit, page) => {
    return new Promise(async (resolve, reject) => {
        try {
            const total = await User.countDocuments()
            const allUser = await User.find().limit(limit).skip(page*limit)
            resolve ({
                status: 'OK',
                message: 'all user list',
                data: allUser,
                total: total,
                pageCurrent: Number(page +1),
                totalPage: Math.ceil(total/limit)
            })
        }catch(err){
            reject(err);
        }
    })
    
}

const detailUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
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
const updatePassword = (userId, { oldPassword, newPassword }) => {
    console.log('123123')
    return new Promise(async (resolve, reject) => {
        try {
            // Tìm user theo userId
            const user = await User.findOne({ _id: userId });
            if (!user) {
                return resolve({
                    status: 'error',
                    message: 'User not found',
                });
            }

            // Xác nhận mật khẩu cũ (nếu cần)
            const isMatch = await bcrypt.compare(oldPassword, user.password);
            if (!isMatch) {
                return resolve({
                    status: 'error',
                    message: 'Old password is incorrect',
                });
            }

            // Mã hóa mật khẩu mới
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            // Cập nhật mật khẩu mới trong cơ sở dữ liệu
            user.password = hashedPassword;
            await user.save();

            resolve({
                status: 'OK',
                message: 'Password updated successfully',
            });
        } catch (err) {
            reject({
                status: 'error',
                message: err.message,
            });
        }
    });
};


module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    detailUser,
    updatePassword

}