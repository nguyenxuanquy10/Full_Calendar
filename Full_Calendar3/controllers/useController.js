const router = require('express').Router();
const jwt = require('jsonwebtoken');
const userModel = require('../models/usersModel')
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const eventModel = require('../models/eventsModel');

//Login, Logout 
router.get('/user/login', function(req, res) {

    res.render('userLogin')
})
router.post('/user/login', async function(req, res) {
    const password = req.body.password;
    const user = await userModel.findOne({ username: req.body.username });
    try {
        if (!user || !(await user.isMatchPassword(password))) {
            // return res.send(new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password'));
            return res.status(404).json({ error: "Sai tên người dùng hoặc mật khẩu" });
        }
        const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
            expiresIn: process.env.TOKEN_EXPIRE
        });
        res.status(200).json({ token: token, error: null });
    } catch (err) {
        console.log(err);
    }
})
router.get('/logout', function(req, res) {

})
router.post('/logout', function(req, res) {

    })
    // CRUD user 
router.get('/users', function(req, res) {

})
router.get('/user', function(req, res) {

})
router.post('/user', async function(req, res) {
    const newUser = await userModel.create(req.body); //
    if (!newUser) {
        return res.status(400).json({ message: "Bad request" })
    }
    res.status(200).json({ message: 'create success' })
})
router.put('/user', function(req, res) {

})
router.delete('/user', function(req, res) {

})

//router admin routes
//Login, Logout 
router.get('/admin/login', function(req, res) {
    res.render('adminLogin')
})
router.post('/admin/login', async function(req, res) {
    const password = req.body.password;
    const user = await userModel.findOne({ username: req.body.username });
    console.log(req.body)
    try {
        if (!user || !(await user.isMatchPassword(password))) {
            // return res.send(new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password'));
            return res.status(404).json({ error: "Sai tên người dùng hoặc mật khẩu" });
        }
        const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
            expiresIn: process.env.TOKEN_EXPIRE
        });
        res.status(200).json({ token: token, error: null });

    } catch (err) {
        console.log(err);
    }
})
module.exports = router