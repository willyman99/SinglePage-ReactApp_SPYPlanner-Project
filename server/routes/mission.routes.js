const express = require('express')
const router = express.Router()

const User = require('../models/user.model')
const Mission = require('../models/mission.model')



//Create a mission
router.post('/create', (req, res) => {

    if (req.session.currentUser.role === 'director') {

        const mission = req.body

        Mission
            .create(mission)
            .then(response => User.findByIdAndUpdate(req.session.currentUser._id, { $push: { missions: response.id } }))
            .then(response => res.json(response))
            .catch(err => res.status(500).json({ code: 500, message: 'Error saving Mission', err }))
    }
})


//Read one mission
router.get('/:missionId', (req, res) => {
    if (req.session.currentUser.role === 'director') {
        Mission
            .findById(req.params.missionId)
            .then(response => res.json(response))
            .catch(err => res.status(500).json({ code: 500, message: 'Error fetching Mission', err }))
    }
})


//Update Mission
router.put('/:missionId/edit', (req, res) => {
    if (req.session.currentUser.role === 'director') {
        Mission
            .findByIdAndUpdate(req.params.missionId, req.body)
            .then(response => res.json(response))
            .catch(err => res.status(500).json({ code: 500, message: 'Error editing Mission', err }))
    }
})


//Delete Mission
router.put('/:missionId/delete', (req, res) => {
    if (req.session.currentUser.role === 'director') {
        Mission
            .findByIdAndDelete(req.params.missionId, req.body)
            .then(() => res.json({ mesage: 'Mission deleted successfully' }))
            .catch(err => res.status(500).json({ code: 500, message: 'Error deleting Mission', err }))
    }
})

module.exports = router