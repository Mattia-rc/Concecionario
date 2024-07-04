const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const UserSchema = new mongoose.Schema({
    "email": {
        type: String,
        required: true,
        unique: true,
    },
    "username": {
        type: String,
        required: true,
    },
    "password": {
        type: String,
        required: true
    },
    "vehiculos": [
        {
            "marca": {
                type: String,
                required: true
            },
            "ano": {
                type: Number,
                required: true
            },
            "modelo": {
                type: String,
                required: true
            },
            "precio": {
                type: Number,
                required: true
            },
            "kilometraje": {
                type: Number,
                required: true
            },
            "transmicion": {
                type: String,
                required: true,
            },
            "descripcion": {
                type: String,
                required: true
            },
            "images": {
                type: [String], // Array of strings for multiple images
                required: true
            }
        }
    ]
});

UserSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next()
});

module.exports = mongoose.model('User', UserSchema);
