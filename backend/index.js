import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken';
import User from './models/UserAccounts.js';
import verifyToken from './utils/authorization.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connected to mongodb`);
} catch (error) {
    console.error(error);  
}

app.use(morgan('dev')); // logger
app.use(express.json()); // parse data to the body
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.post('/signup', async (req,res) => {
    const {username, password} = req.body;
    try {
        const userExists = await User.findOne({username});
        if (userExists) {
            return res.status(400).json({Error: 'This Username already exists'});
        }
        const hashedPassword = await bcryptjs.hash(password, 10);
        const newUser = new User({username, password: hashedPassword});
        await newUser.save();
        res.status(201).json({message: 'It worked'});
    } catch (error) {
        console.log(error);
        
        res.status(500).json({message: 'big fail'})
        
    }
})

app.get('/', (req, res) => {
    res.send("welcome")
})

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);    
})

app.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username});
        if (!user) {
            return res.status(401).json({error: 'Username not found'});
        }
        const passwordMatch = await bcryptjs.compare(req.body.password, user.password)
        if(!passwordMatch) {
            return res.status(401).json({error: 'Wrong Password'});
        }
        const token = jwt.sign({username: user.username}, 'secret', {expiresIn: '2h'});
        res.status(200).json({token});
    } catch (error) {
        console.log(error);
        
        res.status(500).json({error: 'Server Error'})
    }
})
app.get('/kekypoopy', verifyToken, (req, res) => {
    res.json({message: 'You have ENCHADED'})
})

//    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImV4YW1wbGUiLCJpYXQiOjE3Mjk4ODAwMTd9.DTS_fnLdpUYmPufuGUkvvR6-_LOfWdYUiMeAPUd4O5k"