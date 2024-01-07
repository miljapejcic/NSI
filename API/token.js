const jwt = require('jsonwebtoken');

const secret_string = 'secretstringzajsonwebtoken';

const createToken = (id) => {
    return jwt.sign({ id }, secret_string, {
        expiresIn: '30d'
    });
}

module.exports = {
    createToken
}