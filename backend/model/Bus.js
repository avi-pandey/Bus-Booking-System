const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
    reservedSeats: {
        type: Array
    },
    isFull: {
        type: Boolean
    }
})

const serviceSchema = new Schema({
    from: {
        type: String
    },
    to: {
        type: String
    },
    trvDate: {
        type: Date
    },
    dep: {
        type: String
    },
    arr: {
        type: String
    },
    fare: {
        type: String
    }
})

const bustSchema = new Schema({
    busNumber: {
        type: String
    },
    busType: {
        type: String
    },
    totalSeats: {
        type: String
    },
    seatLayout: {
        type: String,
        default: '4/10'
    },
    service: {
        type: serviceSchema
    },
    reservation: {
        type: reservationSchema
    }
})

const BusModel = mongoose.model('Bus', bustSchema)
module.exports = BusModel;
