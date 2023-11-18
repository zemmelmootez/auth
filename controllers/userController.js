const User = require('../models/userSchema')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userController={
    register:async(req,res)=>{
        
        const {name,email,password,confirmPassword}=req.body

        if (!name || !email || !password || !confirmPassword)
        return res.status(400).json({message:"missing data "})
        
        const user=await User.findOne({email})

        if(user)
        return res.status(400).json({message:"user already exist"})
        
        //optional
        if(password!=confirmPassword)
        return res.status(400).json({message:"password doesnt match"})
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, salt);
        const newUser=await User.create({name,email,password:hash})

        if(!newUser)
        return res.status(400).json({message:"user creation failed"})

        
        return res.status(200).json({message:"user create succesfully",user:{
            name,
            email,
            token:genToken(newUser.id,newUser.name)
        }})
    },
    login:()=>{

    }
}
function genToken(id,name){
        
        const token=jwt.sign({id,name},"12345")

        return token
    
}

module.exports=userController