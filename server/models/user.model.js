// User model development
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({

    username: {
        type: String,
        unique: true,
        required: [true, 'Username is mandatory.']
    },

    password: {
        type: String,
        required: [true, 'Password is mandatory.']
    },

    name: String,

    role: {
        type: String,
        enum: ['citizen', 'director', 'agent'],
        default: 'citizen'
    },

    //Citizen Exclusive Attributes
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],

    plans: [{
        type: Schema.Types.ObjectId,
        ref: 'PlanBlock'
    }],
    //-----
    
    //Agent exclusive attributes
    assignedMission: {
            type: Schema.Types.ObjectId,
            ref: 'Mission'
    },

    medals: {
        type: Number,
        default: 0
    }
    //-----

}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema)

module.exports = User