import { Schema, model, models } from 'mongoose';

const message = new Schema({
    id: {type: String, required: true},
    content: {type: String, required: true},
    date: {type: Object, required: true}
})

export default models.message||model("message", message);