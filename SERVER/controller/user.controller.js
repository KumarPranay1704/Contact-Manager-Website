const User = require('../models/User');
const bcrypt = require('bcryptjs');
const joi = require('joi');
const jwt = require('jsonwebtoken');
const secretKey = "project-2021"
exports.register=async(req,res)=>{

    const Registerschema = joi.object({
        fullName:joi.string().required().min(3),
        email:joi.string().email().required(),
        password:joi.string().required().min(6).max(10),
    })

    try{
        let registerFields = await Registerschema.validateAsync(req.body)
        let user = await User.findOne({email:registerFields.email});
        

    if(!user){

        user = new User(registerFields);
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password,salt);
        await user.save();
        res.status(200).json({
            message:"User Registered Successfully",
            user
        })
    }else{
        res.status(500).json({
            message:"User Already Exists",
        })
    }
    }catch(err){
        console.log(err)
        res.status(500).json({
            message:"Something Went Wrong",
            Error:err
        })
    }
}

exports.login = async(req,res)=>{
    const loginSchema = joi.object({
        email:joi.string().required(),
        password:joi.string().required()
    })

    try{
        const loginFields = await loginSchema.validateAsync(req.body)
        let user = await User.findOne({email:loginFields.email});

        if(!user){
            res.status(400).json({
                message:"Username/Password doesn't exist"
            })
        }else{
            const is_match = await bcrypt.compare(loginFields.password,user.password);
            if(!is_match){
                res.status(400).json({
                    message:"Username/Password doesn't exist"
                })
            }else{
                const payload = {
                    userdata:{
                        id:user._id
                    }
                }
                const token = await jwt.sign(payload,secretKey,{expiresIn:7200});
                res.status(200).json({
                    message:"Logged in",
                    user:{id:user._id,name:user.fullName},
                    token
                })
            }
        }
    }catch(err){
        console.log(err)
        res.status(500).json({
            message:"Something Went Wrong",
            Error:err
        })
    }
}