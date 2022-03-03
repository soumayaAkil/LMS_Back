const User =require('../models/UserModel');
const jtoken = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); 



exports.userLogin = async function (req, res) {
    // checking email
    console.log(req.body.email)
    const [user] = await User.findOne(req.body.email);
    console.log(user[0].id_user);
    if (!user) return res.status(400).send("email");
    const token = jtoken.sign({id_user: user[0].id_user},process.env.TOKEN_SECRET);
    let objToSend = {
        token: token,
        firstName: user[0].firstName,
        lastName: user[0].lastName,
        photo: user[0].photo,
        type: user[0].type
    }
    console.log(objToSend);
    res.status(200).send(objToSend);

}


exports.isUserConnected = async function (req, res, next) {
    // check if token exist
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('ACCESS DENIED');

    // check if token is valid
    try {
        const verified = jtoken.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send('invalid token');
    }
} 