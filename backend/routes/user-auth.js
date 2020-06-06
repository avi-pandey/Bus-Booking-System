const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const UserModel = require('../model/user')

const router = express.Router();

router.post('/signup', async (req, res, next) => {
  let newUser = {
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    dob: req.body.dob,
    mobileno: req.body.mobileno,
    gender: req.body.gender
  }
  let validation = true;
  let emailPattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
  if (!newUser.email || !newUser.password || !newUser.dob || !newUser.gender || !newUser.mobileno || !newUser.name) {
    res.status(400).json({ message: 'empty credential' });
    validation = false;
    return
  }
  else if (!emailPattern.test(newUser.email)) {
    res.status(401).json({ message: 'invalid email id' })
    validation = false
    return
  }
  else if ((newUser.password).length < 7) {
    res.status(401).json({ message: 'password length > 7' })
    validation = false
    return
  }
  else if ((newUser.mobileno).length != 10) {
    res.status(401).json({ message: 'mobile no of 10 digit' })
    validation = false
    return
  }
  try {

    if (validation) {
      const savedUser = await UserModel.create(newUser);
      res.status(201).json({
        message: 'signup successful',
        user: savedUser
      });
    }
  } catch (err) {
    next(err)
  }
});

router.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {

      if (err || !user) {
        res.status(401).json({ status: info.status, message: info.message })
        return
      }
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error)
        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, 'top_secret');
        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});


module.exports = router;