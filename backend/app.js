

const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const logger = require('morgan');
const passport = require('passport')
const userAuth = require('./routes/user-auth')
const secureRoute = require('./routes/index')
const authEmail = require('./routes/emailAuth')
const busRoute = require('./routes/bus')
const seatRoute = require('./routes/seats')
const cors = require('cors')

const app = express();

mongoose.connect('mongodb+srv://ticket_booking_db:Busticket@12@busticketbookingsystem-hh4kf.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.on('error', error => console.log(error));

app.use(cors())
app.use(logger('dev'));

require('./auth')
require('./initialize-db')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/', userAuth);
app.use(passport.authenticate('jwt', { session: false }))
app.use('/user/profile', secureRoute);
app.use('/auth/email', authEmail);
app.use('/bus', busRoute);
app.use('/seats', seatRoute);

app.use(function (err, req, res, next) {
   throw err
});

module.exports = app;
