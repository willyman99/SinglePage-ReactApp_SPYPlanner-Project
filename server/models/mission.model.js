// Mission Model
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const missionSchema = new Schema({

    agent: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    targets: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],

    method: {
        type: String,
        enum: ['Monitor', 'Kill', 'Kidnap', 'Protect', 'RetrieveAsset']
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

    isCompleted: Boolean

})

const Mission = mongoose.model("Mission", missionSchema)

module.exports = Mission