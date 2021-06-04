const express = require('express')
const router = express.Router()

const User = require('../models/user.model')
const PlanBlock = require('../models/planBlock.model')
const Mission = require('../models/mission.model')
const MissionPlanBlock = require('../models/missionPlanBlock.model')

const { checkRoles } = require('../middlewares')


//Create Plan Block and save in assigned Mission
router.post('/plan/addBlock', checkRoles('agent'), (req, res) => {

    const { title, description, parallelCitizenPlanBlock, locationName } = req.body
    const currentMission = req.session.currentUser.assignedMission

    console.log(locationName)

    MissionPlanBlock
        .create({ title, description, parallelCitizenPlanBlock, locationName })
        .then(response => Mission.findByIdAndUpdate(currentMission, { $push: { plan: response.id } }))
        .then(() => Mission.findByIdAndUpdate(currentMission, { status: 'pending' }))
        .then(() => res.json({message: 'MissionPlanBlock created succesfully.'}))
        .catch(err => res.status(500).json({ code: 500, message: 'Error creating & saving MissionPlanBlock.', err }))
})

//Read all Plan Blocks in assigned Mission
router.get('/plan', checkRoles('agent'), (req, res) => {

    const currentMission = req.session.currentUser.assignedMission

    Mission
        .findById(currentMission)
        .select('plan codename')
        .populate([
            {
                path: 'plan',
                model: 'MissionPlanBlock',
                select: '',
                populate: {
                    path: 'parallelCitizenPlanBlock',
                    model: 'PlanBlock',
                    select: '',
                    populate: {
                        path: 'participants',
                        model: 'User',
                        select: 'name'
                    }
                }
            }
        ])
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error fetching mission plans.', err }))
})


//Read one Plan Block
router.get('/plan/:missionPlanBlockId', checkRoles('agent', 'director'), (req, res) => {

    const {missionPlanBlockId} = req.params

    MissionPlanBlock
        .findById(missionPlanBlockId)
        .populate([
            {
                path: 'parallelCitizenPlanBlock',
                model: 'PlanBlock',
                populate: {
                    path: 'participants',
                    model: 'User',
                    select: 'username'
                }
            }
        ])
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error fetching mission plan block.', err }))
})


//Update one Plan Block in assigned Mission
router.put('/plan/:missionPlanBlockId', checkRoles('agent'), (req, res) => {

    const {missionPlanBlockId} = req.params
    const { title, description, parallelCitizenPlanBlock } = req.body

    MissionPlanBlock
        .findByIdAndUpdate(missionPlanBlockId, { title, description, parallelCitizenPlanBlock }, {new: true})
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error editing MissionPlanBlock.', err }))
})


//Delete one Plan Block in assigned Mission
router.delete('/plan/:missionPlanBlockId', checkRoles('agent', 'director'), (req, res) => {

    const {missionPlanBlockId} = req.params

    MissionPlanBlock
        .findByIdAndDelete(missionPlanBlockId)
        .then(() => res.json({ message: 'MissionPlanBlock deleted successfully.' }))
        .catch(err => res.status(500).json({ code: 500, message: 'Error deleting MissionPlanBlock.', err }))
})


module.exports = router