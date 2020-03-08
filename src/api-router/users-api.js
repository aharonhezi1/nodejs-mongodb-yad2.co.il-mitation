const express = require('express');
const router = new express.Router();
const mongoose = require('mongoose');

const auth = require("../middleware/auth");
const User=require('../db/userModel')


router.get('/api/user/:id',async (req,res)=>{
	const owner=req.params.id;
	try{
//const user= await User.findOne({email:'Shimon@gmail.com'});
const id= new mongoose.mongo.ObjectId(owner)
    const user= await User.findById(owner)
  
		res.send(user)
	}catch(e){
		console.log(e);
		res.status(400).send(e);
	}
})
router.post("/api/user/login", async (req, res) => {
    try {
      const user = await User.findByCredentials(
        req.body.email,
        req.body.password
      );
      const token = await user.generateAuthToken();
      res.send({ user, token });
    } catch (e) {
      res.status(400).send();
    }
  });
  router.post("/api/user/logout", auth, async (req, res) => {
    try {
      req.user.tokens = req.user.tokens.filter(
        token => token.token !== req.token
      );
      await req.user.save();
      res.send();
    } catch (e) {
      res.status(500).send();
    }
  });

module.exports = router;
