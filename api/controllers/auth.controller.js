import User from "../models/user.model.js";
import { comparePassword, hashPassword } from "../utils/brcrypts.js";
import { AppError } from "../utils/error.js";
import jwt from 'jsonwebtoken'
const signup = async(req,res,next) => {
    const {username, email,password} = req.body;
    console.log(req?.body)
    try{
        console.log(!username || !email || !password  || username === '' || email === '' || password === '')
        if(username === ''){
            console.log(username)
            throw new AppError("all fields are mandatory",400)
        }
        const hasPassword =  await hashPassword(password);
        const user = new User({
            username,
            email,
            password:hasPassword
        });
        await user.save();
        return res.status(201).json({message:"User has Signup Successfully"});
    }catch(error){
        next(error);
    }
}
const signin = async(req,res,next) => {
    const {email , password} = req?.body;
    try{
        if(!email || !password || email === "" || password === ""){
            throw new Error("All Field are Require");
        }

        const validUser = await User?.findOne({email});

        if(!validUser){
            throw new AppError("user not found",404)
        }
        const validPassword = await comparePassword(password,validUser?.password);
        const {password:pass,...rest} = validUser._doc;

        if(!validPassword){
            throw new AppError("Invalid Password",400);
        }
        const token = jwt.sign({id:validUser._id}, process.env.JWT_SECRET_KEY);
        
        return res.status(200).cookie('access_token',token,{httpOnly:true}).json(rest)

    }catch(error){
        next(error);
    }
}
const google = async(req,res,next) => {
    const {email,name,googlePhotoUrl} = req.body;

    try{
    const user = await User.findOne({email});
    if(user){
        const token =  jwt.sign({id:user._id},process.env.JWT_SECRET_KEY);
        const {password:pass,...rest} = user?._doc;
        return res.status(200).cookie('access_token',token,{httpOnly:true}).json(rest);
    }else{
        const generatePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
        const hasPassword = await hashPassword(generatePassword);
        const newUser = await User.create({
            username:name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
            email,
            password:hasPassword,
            profilePicture:googlePhotoUrl

        })
        await newUser.save();
        const token =  jwt.sign({id:user._id},process.env.JWT_SECRET_KEY);
        const {password:pass,...rest} = user?._doc;
        return res.status(200).cookie('access_token',token,{httpOnly:true}).json(rest);
    }  
    }catch(error){
        next(error)
    }
}

export {signup,signin,google};