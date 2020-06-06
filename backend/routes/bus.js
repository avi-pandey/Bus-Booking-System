const express = require('express');
const router = express.Router();
const BusModel = require('../model/Bus')
const moment = require('moment');

router.get('/search', async (req, res, next) => {
    let from = req.header('from')
    let to = req.header('to')
    let trvDate = req.header('trvDate')
    console.log(from,to,trvDate)

    try {
        const result = await BusModel.find({ "service.from": from, 'service.to': to, "service.trvDate": trvDate })
        if (result.length > 0) {
            res.status(201).json({
                result
            })
        } else {
            res.status(404).json({ message: "no bus found" })
        }

    } catch (err) {
        next(err)
    }
});

module.exports = router
