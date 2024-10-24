import mongoose from 'mongoose';

export const cardSchema = new mongoose.Schema({
    cardID: {
        type: mongoose.ObjectId,
        ref: 'Task',
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    backInfo: {
        type: String,
        required: true,
    }
})

export default new mongoose.model('FlashCards', cardSchema)