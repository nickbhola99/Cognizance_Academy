import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "./models/UserAccounts.js";
import studyRouter from "./routes/studyguide.js";
import verifyToken from "./utils/authorization.js";
//log ins and sign ups
dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

try {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log(`Connected to mongodb`);
} catch (error) {
  console.error(error);
}

app.use(cors());
app.use(morgan("dev")); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use("/guide", studyRouter);

app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ Error: "This Username already exists" });
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    return res.status(201).json({ message: "It worked" });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "big fail" });
  }
});

app.get("/", (req, res) => {
  res.send("welcome");
});

app.get("/users", async (req, res) => {
  try {
    const user = await User.find();
    res.send(user);
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).json({ error: "Username not found" });
    }
    const passwordMatch = await bcryptjs.compare(
      req.body.password,
      user.password
    );
    if (!passwordMatch) {
      return res.status(401).json({ error: "Wrong Password" });
    }
    const token = jwt.sign({ username: user.username }, "secret", {
      expiresIn: "2h",
    });
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Server Error" });
  }
});
