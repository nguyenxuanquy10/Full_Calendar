const jwt = require('jsonwebtoken');
const userModel = require('../models/usersModel');
const isAdmin = async(req, res, next) => {
    if (req.userId) {
        const userAdmin = await userModel.findOne({ _id: req.userId });
        if (!userAdmin) {
            req.isAdmin = false;
        }
        if (userAdmin.role === 'admin') {
            req.isAdmin = true;
            console.log("success true")

        } else {
            req.isAdmin = false;
        }

    } else {
        req.isAdmin = false;
    }
    next()

}
const verifyToken = (req, res, next) => {
    if (req.headers.token) {
        const token = req.headers.token
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
            if (err) {
                req.userId = undefined
            } else {
                req.userId = decoded.id;

            }
        })
    } else {
        req.userId = undefined
        alert("You is not admin")
        return res.redirect('/admin/login')
    }
    next();

}
module.exports = {
    verifyToken,
    isAdmin
}