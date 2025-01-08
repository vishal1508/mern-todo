import express from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import userRoute from './routes/user.route.js';
import auth from './routes/auth.router.js'
const dburl = process.env.MONGO_URL;

mongoose.connect(dburl).then((response) => {
console.log("mongo connected ....")
}).catch(error => {
    console.log(error)
})
const app = express();
const port = process.env.PORT;
app.listen(process.env.PORT,() => {
    console.log(`Server is Running On ${port}`);
})
app.use(express.json());
app.use('/api/user',userRoute);
app.use('/api/auth',auth);
