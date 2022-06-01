const jwt = require('jsonwebtoken');

const getToken = (payload) => {
    return jwt.sign({
        data: payload,
    }, process.env.AUTH_SECRET, { expiresIn: process.env.AUTH_EXPIRES });

}

const getTokenData = (token) => {
    let data = null
    jwt.verify(token, process.env.AUTH_SECRET, (err, decoded) => {
        if (err) {
            throw { status: 400, message: 'Token invalido' };
        } else {
            console.log(decoded);
            data = decoded
        }
    });
    return data
}

module.exports = {
    getToken,
    getTokenData
}