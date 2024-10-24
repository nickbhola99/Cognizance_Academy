import mongoose from "mongoose";
import { cardSchema } from "./FlashCards";
const guideScheme = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    dateCreated: {
        type: Date,
    },
    topic: {
        type: [String],
        required: true,
        enum: ["Literature", "Math", "Science", "Computer Science", "Sports", "World History"]
    },
    cards: [cardSchema],
}, {timestamps: true});