import User from "../models/user.model.js";
import { hashPassword } from "../utils/brcrypts.js";

const signup = async(req,res) => {
    const {username, email,password} = req.body;
    console.log(req?.body)
    try{
        console.log(!username || !email || !password  || username === '' || email === '' || password === '')
        if(username === ''){
            console.log(username)
            throw new Error({
                message:"all fields are mandatory"
            })
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
        return res.status(400).json({message:error?.message});
    }
}

export {signup};