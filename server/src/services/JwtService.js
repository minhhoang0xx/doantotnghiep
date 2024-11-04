const jwt = require('jsonwebtoken');
require('dotenv').config();

const generalAccessToken = (payload) =>{
    const access_token = jwt.sign(
        {...payload},process.env.KEY, {expiresIn: '6h'}
    )// ...payload trải các thuộc tính của đối tượng ra và có thể bổ sung hoặc thay đổi chúng trước khi truyền vào hàm.
    // payload truyền toàn bộ đối tượng vào hàm mà không thay đổi cấu trúc của nó.
    return access_token
} 

const generalRefreshToken = (payload) => {
    const refresh_token = jwt.sign(
        {...payload}
    ,process.env.KEY, { expiresIn: '90d' });
    
    return refresh_token;
}

const refreshTokenJwt = (token) => {// cap token moi khi refreshtoken cu het han
    return new Promise((resolve, reject) => {
        try {
            jwt.verify(token, process.env.KEY, async (err, user) =>{
                if(err){
                    resolve({
                        status :"rTokenJwt error",
                        message: err
                    })
                }
                const access_token = await generalAccessToken({
                    id: user?.id,
                    isAdmin :user?.isAdmin
                })
                resolve ({
                    status: 'OK',
                    message: 'success',
                    access_token

                })
            })
        }catch(err){
            reject(err);
        }
    })
}



module.exports = {
    generalAccessToken,
    generalRefreshToken,
    refreshTokenJwt
}