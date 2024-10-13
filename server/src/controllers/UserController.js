const UserService = require('../services/UserService');
const JwtService = require('../services/JwtService');

const createUser = async (req,res)=>{
    try{
        const {name,email,password,confirmPassword,phone} = req.body
        const reg = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
        const isCheckEmail = reg.test(email)
        if(!name || !email || !password || !confirmPassword || !phone){
            return res.status(200).json({
                status: 'error',
                message: 'the input is invalid'
            })
        }else if(!isCheckEmail){
            return res.status(200).json({
                status: 'error',
                message: 'Email incorrect'
            })
        }else if(password !== confirmPassword){
            return res.status(200).json({
                status: 'error',
                message: 'Your password is incorrect'
            })
        } 
        const response = await UserService.createUser(req.body) // response de khac voi thang res khong bi nham
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
const loginUser = async (req,res)=>{
    try{
        const {email,password} = req.body
        const reg = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
        const isCheckEmail = reg.test(email)
        if(!email || !password){
            return res.status(200).json({
                status: 'error',
                message: 'the input is invalid'
            })
        }else if(!isCheckEmail){
            return res.status(200).json({
                status: 'error',
                message: 'Email incorrect'
            })
        }
        const response = await UserService.loginUser(req.body) // response de khac voi thang res khong bi nham
        const {refresh_token, ...newResponse} = response
        res.cookie('refresh_token', refresh_token,{
            HttpOnly: true, // de chi lay cookie thong qua cookie
            Secure: true, // de bao mat client

        })
        return res.status(200).json(newResponse)  
    }catch(e){
        return res.status(404).json({ 
            status: 'error0',
            message: e.message,
            error: e
        })
    }
}

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

const updateUser = async (req,res)=>{
    try{
        const userId = req.params.id
        const data = req.body
        if(!userId){
            return res.status(200).json({
                status: 'ERR',
                message: 'The user ID is required'
            })
        }
        const response = await UserService.updateUser(userId,data) // response de khac voi thang res khong bi nham
        return res.status(200).json(response) 
    }catch(e){
        return res.status(404).json({ 
            status: 'error0',
            message: e.message,
            error: e
        })
    }
}

const deleteUser = async (req,res)=>{
    try{
        const userId = req.params.id
        if(!userId){
            return res.status(200).json({
                status: 'ERR',
                message: 'The user ID is required'
            })
        }
        const response = await UserService.deleteUser(userId) // response de khac voi thang res khong bi nham
        return res.status(200).json(response) 
    }catch(e){
        return res.status(404).json({ 
            status: 'error0',
            message: e.message,
            error: e
        })
    }
}

const detailUser = async (req,res)=>{
    try{
        const userId = req.params.id
        if(!userId){
            return res.status(200).json({
                status: 'ERR',
                message: 'The user ID is required'
            })
        }
        const response = await UserService.detailUser(userId) // response de khac voi thang res khong bi nham
        return res.status(200).json(response) 
    }catch(e){
        return res.status(404).json({ 
            status: 'error0',
            message: e.message,
            error: e
        })
    }
}

const getAllUser = async (req,res)=>{
    try{
        const{limit,page} = req.query
        const response = await UserService.getAllUser(Number(limit) || 10, Number(page) || 0) // response de khac voi thang res khong bi nham
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

        const token = req.cookies.refresh_token
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
    createUser,
    loginUser,
    logOut,
    updateUser,
    deleteUser,
    getAllUser,
    detailUser,
    refreshToken
}