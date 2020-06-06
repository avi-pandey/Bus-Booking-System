
const express = require('express');
const router = express.Router();
const BuseModel = require('../model/Bus')

router


    .get('/reserved-seats', async (req, res, next) => {
        let busNumber = req.header('busNumber')
        let result = await BuseModel
            .findOne({ busNumber })
            .select('reservation')
            .select('service.fare')

        res.json({ result })
    })

    .post('/reserve', async (req, res, next) => {

        const seats = req.body.seats
        const busNumber = req.body.busNumber
        const result = await BuseModel.updateOne({ busNumber: busNumber }, {
            $push: { 'reservation.reservedSeats': seats }
        })
        res.status(201).json({ message: 'reserved', result })
    })

    .post('/delete', async (req, res, next) => {
        const resetSeats = req.body.seats
        const busNumber = req.body.busNumber
        const result = await BuseModel.updateOne({ busNumber: busNumber }, {
            $unset: { 'reservation.reservedSeats': resetSeats }
        })
    })


module.exports = router