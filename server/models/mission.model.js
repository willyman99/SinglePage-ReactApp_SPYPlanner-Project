// Mission Model
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const missionSchema = new Schema({
    codename: {
        type: String,
        required: [true, 'Mission name is mandatory.']
    },

    agent: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'An Agent must be assigned.']
    },

    target: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    objective: {
        type: String,
        enum: ['monitor', 'kill', 'kidnap', 'protect', 'ron', 'extract', 'impersonate'],
        default: 'monitor'
    },

    plan: [{
        type: Schema.Types.ObjectId,
        ref: 'MissionPlanBlock'
    }],

    status: {
        type: String,
        enum: ['unplanned', 'pending', 'approved', 'rejected'],
        default: 'unplanned'
    },

    isCompleted: {
        type: Boolean,
        default: 'false'
    }

})

const Mission = mongoose.model("Mission", missionSchema)

module.exports = Mission