const eventModel = require('../models/eventsModel');
const { isAdmin, verifyToken } = require('../middlewarer/auth');
const router = require('express').Router();
const userModel = require('../models/usersModel');
router.get('/user/home', (req, res) => {
    res.render('user');
});
// router.get('/admin/home', [verifyToken, isAdmin], async(req, res) => {
//     const orderEvent = await eventModel.find({ isOrder: 0 });
//     if (req.isAdmin) {
//         console.log('success')
//             // res.status(200).json({ orderEvent: orderEvent, isLogin: true, error: null })
//         res.render('admin', { orderEvent: orderEvent, isLogin: true, error: null })
//             // res.render('admin');
//     } else {
//         console.log('false')
//         res.status(404).json({ orderEvent: orderEvent, isLogin: false, error: null })
//     }
//     // res.send({ orderEvent: orderEvent, isLogin: true, error: null });
//     // res.status(200).json({ isLogin: true, error: null })
//     // res.render('admin', { orderEvent: orderEvent, isLogin: true, error: null })
// })

//     // res.status(200).json({ orderEvent: orderEvent, isLogin: true, error: null })
//     res.render('admin', { orderEvent: orderEvent, isLogin: true, error: null })
//         // res.status(200).json({ isLogin: true, error: null })
//         // res.render('admin', { orderEvent: orderEvent, isLogin: true, error: null })
// })
router.get('/admin/home', async(req, res) => {
    const orderEvent = await eventModel.find({ isOrder: 0 });
    res.render('admin', { orderEvent: orderEvent, isLogin: true, error: null });
})
router.post('/create-event', [verifyToken], async(req, res, next) => {
    // const phoneNumber = req.body.phoneNumber; // 
    // const room = req.body.room;
    // const existEvent = await eventModel.findOne({ phoneNumber: phoneNumber });
    // if (existEvent) {
    //     const updateEvent = await eventModel.findOneAndUpdate({ phoneNumber: phoneNumber }, { room: room });
    //     console.log(updateEvent);
    //     if (!updateEvent) {
    //         return res.status(400).json({ message: "Bad request" })
    //     }
    //     return res.status(200).json({ message: "OK" })
    // }
    console.log(req.userId)
    if (req.userId) {
        const checkUser = userModel.findOne({ _id: req.userId });
        if (!checkUser) {
            return res.start(404).json({ error: "You need to login" })
        }
        const event = await eventModel.create(req.body);
        if (!event) {
            return res.status(400).json({ error: "Bad request" })
        }
        res.status(200).json({ message: "Success create" });
    }

})

router.get('/get-event', async(req, res, next) => {
    const events = await eventModel.find({ isOrder: 1 });
    res.send(events);
})

router.post('/update-event', [verifyToken, isAdmin], async(req, res, next) => {
    const updateEvent = {
        user: req.body.user,
        title: req.body.title,
        start: req.body.start,
        end: req.body.end,
        display: req.body.display,
        isOrder: 1,
    }
    if (req.isAdmin) {
        const eventUpdate = await eventModel.findByIdAndUpdate({ _id: req.body._id }, updateEvent);
        if (!eventUpdate) {
            return res.status(404).json({ error: "Bad request" })
        }
        res.status(200).json({ message: "Success update" });
    } else {
        res.status(404).json({ error: "You is not admin " })
    }
})
router.delete('/delete-event/:id', [verifyToken, isAdmin], async(req, res) => {
        if (req.isAdmin) {
            const deteleEvnet = await eventModel.deleteOne({ _id: req.params.id });
            console.log(deteleEvnet);
            if (!deteleEvnet) {
                return res.status(400).json({ error: "Your is not admin" })
            }
            return res.status(200).json({ message: "Success delete" })
        } else {
            res.status(404).json({ error: "You is not admin " })
        }

    })
    //controller order event 
router.get('/order-event', async(req, res) => {
    const orderEvent = await eventModel.find({ isOrder: 0 });
    // const orderEvent = await eventModel.find();

    if (!orderEvent) {
        return res.status(404).json({ message: "Bad request" });
    }
    return res.status(200).json(orderEvent);
})
router.get('/check-event', async() => {
    const id = req.body.id; //
    const checkEvent = await eventModel.find({ _id: id }); //
    if (checkEvent) {
        return res.status(400).json({ checked: 1 });
    }
    return res.status(200).json({ checked: 0 });
})
router.post('/update-eventId', [verifyToken, isAdmin], async(req, res) => {

    if (req.isAdmin) {
        const id = req.body.id;
        const updateEvent = await eventModel.findOne({ _id: id });
        updateEvent.isOrder = 1;
        console.log(updateEvent);
        await updateEvent.save();
        if (!updateEvent) {
            return res.status(404).json({ error: "Bad request" })
        }
        res.status(200).json({ message: "Success update" });
    } else {
        res.status(404).json({ error: "You is not admin " })
    }
})
router.delete('/delete-eventId', [verifyToken, isAdmin], async(req, res) => {
    if (req.isAdmin) {
        const id = req.body.id;
        console.log(req.body)
        const deleteEvent = await eventModel.findByIdAndDelete({ _id: id });
        if (!deleteEvent) {
            return res.status(400).json({ error: "You is not admin" });
        }
        res.status(200).json({ message: "Success delete" })
    } else {
        res.status(404).json({ error: "You is not admin " })
    }
})
router.get('check-event-exist', async(req, res) => {
        const getEvent = await eventModel.findByIdAnd({ _id: req.body.id })
    })
    // admin routes
router.post('/admin/create-event', [verifyToken, isAdmin], async(req, res, next) => {
    if (req.isAdmin) {
        const phoneNumber = req.body.phoneNumber; // 
        const room = req.body.room;
        const existEvent = await eventModel.findOne({ phoneNumber: phoneNumber });
        if (existEvent) {
            const updateEvent = await eventModel.findOneAndUpdate({ phoneNumber: phoneNumber }, { room: room });
            console.log(updateEvent);
            if (!updateEvent) {
                return res.status(400).json({ error: "You is not admin" })
            }
            return res.status(200).json({ message: "Success update" })
        }
        const event = await eventModel.create(req.body);
        if (!event) {
            return res.status(400).json({ message: "You is not admin" })
        }
        res.status(200).json(event);
    } else {
        res.status(404).json({ error: "You is not admin " })
    }
})
module.exports = router;