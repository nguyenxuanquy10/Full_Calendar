const eventRouter = require('./eventController');
const userRouter = require('./useController');

const router = (app) => {
    app.use('/', userRouter);
    app.use('/', eventRouter)
}
module.exports = router;