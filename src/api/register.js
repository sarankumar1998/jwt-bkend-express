const express = require('express');
const User = require('../models/user');
// const bcrypt = require('bcrypt');
// let pwd = bcrypt.hashSync('12345',6)
// console.log(pwd);

const router = express.Router();

router.post('/register', async (req, res) => {
 

  const { firstname, lastname, email, password } = req.body;

  // const salt  = await bcrypt.genSalt();
  // const hashPassword= await bcrypt.hash(password,salt);  

   // for exit user
  const alreadyExists = await User.findOne({ where: { email } }).catch((err) =>
    console.log(err)
  );
 
  if (alreadyExists) {
    return res.status(400).json({ msg: 'User already exists' });
  }

  // for new user 

  const newUser = new User({
    firstname: firstname,
    lastname: lastname,
    email: email,
    password: password


  });
  const savedUser = await newUser.save().catch((err) =>  {
    console.log(err);

    res.status(500).json({ error: 'cannot register user at the moment' });
  });

  if (savedUser)
    res.json({
      msg: 'User created successfully',
    });
   
});


module.exports = router;