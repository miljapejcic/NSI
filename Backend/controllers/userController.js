const { User } = require('../models/userModel');
const jwt = require('../token')
const bcrypt = require('bcrypt')

const CreateUser = async (req, res) => {
    bcrypt.hash(req.body.password, 10).then(async hash => {
        const user = await User.create({
            username: req.body.username,
            password: hash,
            name: req.body.name,
        });
        let token = jwt.createToken(user._id);
        let sendInfo = {
            id: user._id,
            username: user.username,
            token: token
        };
        res.status(200).send(sendInfo);
    }).catch(err => res.status(500).send(err.message))
}

const LoginUser = async (req, res) => {
    try {
        console.log(req.body);
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (user) {
            const auth = await bcrypt.compare(password, user.password);
            if (auth) {
                let token = jwt.createToken(user._id)
                let sendInfo = {
                    id: user._id,
                    username: user.username,
                    token: token
                }
                res.status(200).send(sendInfo)
            }
            else {
                res.status(401).send('Incorrect password!')
            }
        }
        else {
            res.status(404).send('Username doesn\'t exist!')
        }
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

module.exports = {
    CreateUser,
    LoginUser
}