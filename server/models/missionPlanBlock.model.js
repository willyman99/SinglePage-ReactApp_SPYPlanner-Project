// MissionPlanBlock Model
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const missionPlanBlockSchema = new Schema({

    title: {
        type: String,
        required: [true, 'Title is mandatory.']
    },

    description: String,

    parallelCitizenPlanBlock: {
        type: Schema.Types.ObjectId,
        ref: 'PlanBlock'
    },

    // location: {
    //     latitude: String,
    //     longitude: String,
    //     placeName: String
    //     //revise google map ipi]
    // }

})

const MissionPlanBlock = mongoose.model("MissionPlanBlock", missionPlanBlockSchema)

module.exports = MissionPlanBlock