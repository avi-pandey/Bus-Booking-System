const express = require('express');
const router = express.Router();
const UserModel = require('../model/user')


router.post('/', async (req, res, next) => {
    try {
        let userEmail = req.body.email
        if (userEmail.length > 0) {
           let user = await UserModel.find({ "email": userEmail })

            if (user.length > 0) {
                if (user[0].email === userEmail) {
                    res.status(201).json({ message: "user already exist" })
                    return
                }
                return
            }
            if (user.length === 0) {
                res.status(201).json({ message: "can register with this email" })
                return
            }
        }

    }
    catch (error) {
        console.log(error)
        next(error)
    }
});


module.exports = router