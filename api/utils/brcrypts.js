import bcrypt from 'bcrypt';
import { AppError } from './error.js';
import jwt from 'jsonwebtoken';

const hashPassword = async (password) => {
    const saltRounds = 12; // Higher is better, but slower. 10–12 is typical for production.
    return await bcrypt.hash(password, saltRounds);
  };
  
  const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
  };

  const verifyToken = async(req,res,next) => {
    const token = req.cookies.access_token;
    try{
      if(!token){
        throw next(new AppError("Unauthorize",401));
      }
      jwt.verify(token,process.env.JWT_SECRET_KEY,(err,user) => {
        if(err){
          throw next(new AppError("Unauthorize",401));
        }
        req.user = user;
        next();
      })
    }catch(error){
      next(new AppError(error));
    }
  }
  export {hashPassword,comparePassword,verifyToken}