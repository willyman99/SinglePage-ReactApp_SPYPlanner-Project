// MissionPlanBlock Model
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const missionPlanBlockSchema = new Schema({

    parallelCitizenPlanBlock: {
        type: Schema.Types.ObjectId,
        ref: 'PlanBlock'
    },

    description: String,

    location: {
        latitude: String,
        longitude: String,
        placeName: String
        //revise google map ipi]
    }

})

const MissionPlanBlock = mongoose.model("MissionPlanBlock", missionPlanBlockSchema)

module.exports = MissionPlanBlock