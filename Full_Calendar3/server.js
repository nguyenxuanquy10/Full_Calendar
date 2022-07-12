const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const eventController = require('./controllers/eventController');
const cors = require('cors');
const path = require('path');
const router = require('./controllers/index');
require('dotenv').config();
app.use(cors())
const main = async() => {
    await mongoose.connect('mongodb://localhost:27017/FullCalendar', {
        useNewUrlParser: true,
        retryWrites: false,
    }, () => console.log("Connected to MongooDb"))
}
main();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/assets')))
    // app.use(express.static('assets'))

app.set('view engine', 'ejs');
router(app)
app.listen(3000, () => {
    console.log("listenPort" + 3000)
})