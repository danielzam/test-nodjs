const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    phone: { type: Number, required: true },
    dni: { type: Number, required: true },
    email: { type: String, required: true },
    date: { type: Date, required: true },
    created: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('User', UserSchema);