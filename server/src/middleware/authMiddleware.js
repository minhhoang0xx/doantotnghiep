const jwt = require('jsonwebtoken');
require('dotenv').config();

const authAdminMiddleware = (req,res,next) => {
    const token = req.headers.token.split(' ')[1]
    jwt.verify(token, process.env.KEY, function(err,user) {
        if(err){
            return res.status(404).json({
                message: 'the authentication token',
                status: err
            })
        }
        if(user?.isAdmin){ // ? la neu khong truyen hoac truyen sai token thi bao loi 
            // con khong co dau ? thi neu khong truyen se bi sap
            next()
        }else{
            return res.status(404).json({
                message: 'the authentication token1',
                status: err
            })
        }
    })
}

const authUserMiddleware = (req, res, next) => {
    const token = req.headers.token.split(' ')[1]
    const userId = req.params.id
    jwt.verify(token, process.env.KEY, function(err,user) {
        if(err){
            return res.status(404).json({
                message: 'the authentication token',
                status: err
            })
        }
        if(user?.isAdmin || user?.id === userId){ // ? la neu khong truyen hoac truyen sai token thi bao loi 
            // con khong co dau ? thi neu khong truyen se bi sap
            next()
        }else{
            return res.status(404).json({
                message: 'the authentication token2',
                status: err
            })
        }
    })
}
module.exports = {
    authAdminMiddleware,
    authUserMiddleware
}