const express=require("express");
const { UserModel } = require("../models/userModel");
const userRouter=express.Router();

userRouter.post("/",async(req,res)=>{
    try {
        const user=new UserModel(req.body);
        await user.save();
        res.json(user)
    } catch (error) {
        res.json(error)
    }
})

userRouter.get("/",async(req,res)=>{
    try {
        const users=await UserModel.find();
        res.json(users)
    } catch (error) {
      res.send(error);  
    }
})

userRouter.get("/:id",async(req,res)=>{
    try {
        const user=await UserModel.findById(req.params.id);
        if(!user){
            res.json({error:"user not found!"})
        }else{
            res.json(user)
        }
    } catch (error) {
        res.json(error)
    }
})

userRouter.patch("/:id",async(req,res)=>{
    try {
        const user=await UserModel.findByIdAndUpdate(req.params.id,req.body);
        if(!user){
            res.json({error:"user not found!"})
        }else{
            res.json("user updated!!")
        }
    } catch (error) {
        res.json(error)
    }
})

userRouter.delete("/:id",async(req,res)=>{
    try {
        const user=await UserModel.findByIdAndDelete(req.params.id);
        if(!user){
            res.json({error:"user not found!"})
        }else{
            res.json("user deleted!!")
        }
    } catch (error) {
        res.json(error)
    }
})

userRouter.get('/search', async (req, res) => {
    try {
      const { firstName } = req.query;
      const users = await UserModel.find({ name: { $regex: new RegExp(firstName, 'i') } });
      res.json(users);
    } catch (error) {
      res.json(error);
    }
  });

router.post('/book-slot/:userId', async (req, res) => {
    const userId = req.params.userId;
    const { slot } = req.body;

    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (user.booked_slots.includes(slot)) {
            return res.status(400).json({ message: 'Slot already booked' });
        }
        user.booked_slots.push(slot);
        await user.save();
        res.json({ message: 'Slot booked successfully' });
    } catch (error) {
        res.json(error)
    }
});

router.get('/booked-slots/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const bookedSlots = user.booked_slots;
        res.json({ bookedSlots });
    } catch (error) {
        res.json(error)
    }
});

  module.exports={
    userRouter
  }