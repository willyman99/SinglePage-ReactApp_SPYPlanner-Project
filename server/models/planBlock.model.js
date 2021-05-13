// PlanBlock Model
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const planBlockSchema = new Schema({

    title: {
        type: String,
        required: [true, 'Description is mandatory.']
    },

    description: String,

    participants: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],

    location: {
        latitude: String,
        longitude: String,
        placeName: String
        //Revisar google maps api
    },

    //date: ??

    //time: ??

})

const PlanBlock = mongoose.model("PlanBlock", planBlockSchema)

module.exports = PlanBlock