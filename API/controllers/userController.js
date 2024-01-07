const { User } = require('../models/userModel');
const jwttoken = require('../token')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const CreateUser = async (req, res) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({
            username: req.body.username,
            password: hash,
            name: req.body.name,
        });

        let token = jwttoken.createToken(user._id);
        let sendInfo = {
            id: user._id,
            name: user.name,
            username: user.username,
            token: token
        };

        res.status(200).send(sendInfo);
    } catch (error) {
        res.status(409).send('Username is already taken.');
    }
}


const LoginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (user) {
            const auth = await bcrypt.compare(password, user.password);
            if (auth) {
                let token = jwttoken.createToken(user._id)
                let sendInfo = {
                    id: user._id,
                    username: user.username,
                    token: token,
                    name: user.name
                }
                res.status(200).send(sendInfo)
            }
            else {
                res.status(401).send('Incorrect password.')
            }
        }
        else {
            res.status(404).send('Username doesn\'t exist.')
        }
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

const VerifyUser = async (req, res) => {
    try {
        const token = req.body.token;
        if (!token) {
            return res.status(403).send('Token not provided');
        }
        const decoded = jwt.verify(token, 'secretstringzajsonwebtoken');
        const _id = decoded.id;
        const user = await User.findOne({ _id });
        let sendInfo = {
            id: user._id,
            name: user.name,
            username: user.username,
            token: token
        };
        res.status(200).send(sendInfo);
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

module.exports = {
    CreateUser,
    LoginUser,
    VerifyUser
}