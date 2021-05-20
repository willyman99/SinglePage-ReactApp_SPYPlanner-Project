const express = require('express')
const router = express.Router()

const User = require('../models/user.model')
const PlanBlock = require('../models/planBlock.model')
const Mission = require('../models/mission.model')
const MissionPlanBlock = require('../models/missionPlanBlock.model')

const { checkRoles } = require('../middlewares')


//Create a mission
router.post('/assign', checkRoles('director'), (req, res) => {

    const {mission} = req.body

    Mission
        .create(mission)
        .then(response => {
            User
                .findByIdAndUpdate(mission.agent, { $push: { assignedMission: response.id } })
                .then(() => res.json(response))
                .catch(err => res.status(500).json({ code: 500, message: 'Error saving Mission to director', err }))
        })
        .catch(err => res.status(500).json({ code: 500, message: 'Error creating Mission', err }))
})


//Read full assigned mission
router.get('/', checkRoles('agent'), (req, res) => {
    Mission
        .findById(req.session.currentUser.assignedMission)
        .select('codename targets objective plan')
        .populate([
            {
                path: 'targets',
                model: 'User',
                select: 'name username friends plans',
                populate: [{
                        path: 'friends',
                        model: 'User',
                        select: 'username name'
                    },
                    {
                        path: 'plans',
                        model: 'PlanBlock',
                        select: 'title'
                    }
                ]
            },
            {
                path: 'plan',
                model: 'MissionPlanBlock',
                select: '',
                    populate: {
                        path: 'parallelCitizenPlanBlock',
                        model: 'PlanBlock',
                        select: 'title'
                    }
            }
        ])
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error fetching Mission', err }))
})


//Read one mission
router.get('/:missionId', checkRoles('director'), (req, res) => {

    const {missionId} = req.params

    Mission
        .findById(missionId)
        .populate([
            {
                path: 'agent',
                model: 'User',
                select: 'username'
            },
            {
                path: 'targets',
                model: 'User',
                select: 'name username friends plans',
                populate: [
                    {
                        path: 'friends',
                        model: 'User',
                        select: 'username name'
                    },
                    {
                        path: 'plans',
                        model: 'PlanBlock',
                        select: 'title'
                    }
                ]
            },
            {
                path: 'plan',
                model: 'MissionPlanBlock'
            }
        ])
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error fetching Mission', err }))
})


//Update Mission Status
router.put('/:missionId', checkRoles('director'), (req, res) => {

    const {missionId} = req.params

    const {status} = req.query
    const isCompleted = status === 'approved'

    Mission
        .findByIdAndUpdate(missionId, { status, isCompleted }, {new: true} )
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error editing Mission', err }))
})


//Delete Mission
router.delete('/:missionId', checkRoles('director'), (req, res) => {

    const {missionId} = req.params

    Mission
        .findByIdAndDelete(missionId)
        .then(() => res.json({ mesage: 'Mission deleted successfully' }))
        .catch(err => res.status(500).json({ code: 500, message: 'Error deleting Mission', err }))
})


module.exports = router