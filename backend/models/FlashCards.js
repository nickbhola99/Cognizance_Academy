import mongoose from 'mongoose';

export const cardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    backInfo: {
        type: String,
        required: true,
    }
})

const FlashCards = new mongoose.model('FlashCards', cardSchema)
export default FlashCards;