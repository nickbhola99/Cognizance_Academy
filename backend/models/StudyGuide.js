import mongoose from "mongoose";
import User from "./UserAccounts.js";
import FlashCards, { cardSchema } from "./FlashCards.js";
const guideSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    // dateCreated: {
    //     type: Date,
    // },
    topic: {
        type: [String],
        required: true,
        enum: ["Literature", "Math", "Science", "Computer Science", "Sports", "World History"]
    },
    createdBy: {
        type: String, 
        // ref: 'User'
    },
    cards: [cardSchema],
}, {timestamps: true});

const StudyGuide = new mongoose.model('StudyGuide', guideSchema)
export default StudyGuide;