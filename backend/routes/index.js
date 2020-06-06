const express = require('express');
const router = express.Router();
const UserModel = require('../model/user')



router.get('/', async (req, res, next) => {
try{
  const user = await UserModel.find({ email: req.user.email })
  console.log(user)
  res.status(201).json({
      message: 'You made it to the secure route',
      user,
  })  }catch(err){
    next(err)
  }
});




module.exports = router;