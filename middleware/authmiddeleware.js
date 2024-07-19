const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
require("dotenv").config();

const auth = async (req, res, next) => {
    let token =req.headers.authorization?.split(' ')[1];
    if (!token)
     return res.status(401).json({ message: 'Token not provided' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await userModel.findById(decoded.id);
        next();
        
    } catch (error) {
        res.status(401).send("Wrong Token")
    }

}

module.exports = auth;