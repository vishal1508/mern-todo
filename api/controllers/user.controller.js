import User from "../models/user.model.js";
import { hashPassword } from "../utils/brcrypts.js";
import { AppError, errorHandler } from "../utils/error.js";

const test = (req, res) => {
  try {
    res.status(200).json({ message: "API is Working" });
  } catch (error) {
    res.status(400).json({ message: "test api error" });
  }
};
const updateUser = async (req, res, next) => {
  try {
    let {username,password,email,profilePicture} = req.body;
    if (req.params.userId !== req.user.id) {
      return next(new AppError("Unauthorize", 401));
    }
    if(password){
        password = await hashPassword(password);
    }
    const updateUser  = await User.findByIdAndUpdate(req.params.userId,{
        $set:{
            username:username,
            email:email,
            password:password,
            profilePicture:profilePicture
        }
    },{new:true})
    const {pass,...rest} = updateUser._doc;
    return res
      .status(200)
      .json({ user:rest, message: "user has updated Successfully" });
  } catch (error) {
    return next(errorHandler(error));
  }
};

export { test, updateUser };
