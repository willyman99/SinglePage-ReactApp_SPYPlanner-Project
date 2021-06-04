const express = require('express')
const router = express.Router()

const User = require('../models/user.model')
const PlanBlock = require('../models/planBlock.model')
const Mission = require('../models/mission.model')
const MissionPlanBlock = require('../models/missionPlanBlock.model')

const { checkRoles } = require('../middlewares')


//Create a mission
router.post('/assign', checkRoles('director'), (req, res) => {

    const { objective, codename, target, agent } = req.body

    Mission
        .create({ objective, codename, target, agent })
        .then(response => User.findByIdAndUpdate(agent, { $push: { assignedMission: response.id } }) )
        .then(() => res.json({message: `Mission ${codename} created succesfully.`}))
        .catch(err => res.status(500).json({ code: 500, message: 'Error creating & saving mission.', err }))
})


//Read full assigned mission
router.get('/', checkRoles('agent'), (req, res) => {
    Mission
        .findById(req.session.currentUser.assignedMission)
        .populate([
            {
                path: 'target',
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
        .catch(err => res.status(500).json({ code: 500, message: 'Error fetching Mission.', err }))
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
                select: 'username medals'
            },
            {
                path: 'target',
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
                        select: '',
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
        .catch(err => res.status(500).json({ code: 500, message: 'Error fetching Mission.', err }))
})


//Update Mission Status
router.put('/:missionId', checkRoles('director', 'agent'), (req, res) => {

    const {missionId} = req.params

    const {status} = req.query
    const isCompleted = status === 'approved'

    Mission
        .findByIdAndUpdate(missionId, { status, isCompleted }, {new: true} )
        .then(response => res.json({message: `Plans for Mission ${response.codename} ${response.status}.`}))
        .catch(err => res.status(500).json({ code: 500, message: 'Error editing Mission.', err }))
})


//Delete Mission
router.delete('/:missionId', checkRoles('director'), (req, res) => {

    const { missionId } = req.params

    Mission
        .findById(missionId)
        .then(response => User.findByIdAndUpdate(response.agent, { $unset: { assignedMission: ""} }) ) //?????
        .then(() => Mission.findByIdAndDelete(missionId))
        .then(() => res.json({ message: 'Mission deleted successfully.' }))
        .catch(err => res.status(500).json({ code: 500, message: 'Error deleting Mission.', err }))
})


module.exports = router