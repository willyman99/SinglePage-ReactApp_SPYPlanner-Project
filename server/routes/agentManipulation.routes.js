const express = require('express')
const router = express.Router()

const User = require('../models/user.model')
const Mission = require('../models/mission.model')
const missionPlanBlock = require('../models/missionPlanBlock.model')

const bcrypt = require("bcrypt")
const bcryptSalt = 10

const { checkRoles } = require('../middlewares')

//Create agent
router.post('/create', checkRoles('director'), (req, res) => {

    const { username, pwd } = req.body

    User
        .findOne({ username })
        .then(user => {

            if (user) {
                res.status(400).json({ code: 400, message: 'Username already exixts.' })
                return
            }

            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(pwd, salt)

            User
                .create({ username, password: hashPass, role: 'agent' })
                .then(response => res.json({ code: 200, message: `Agent ${response.username} created succesfully.` }))
                .catch(err => res.status(500).json({ code: 500, message: 'DB error while creating agent user.', err }))
        })
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while fetching user.', err }))
})

//Show all agents
router.get('/', checkRoles('director'), (req, res) => {
    User
        .find({ role: 'agent' })
        .select('username medals assignedMission')
        .populate('assignedMission')
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error fetching agents.', err }))
})

//Show one agent's details
router.get('/:agentId', checkRoles('director'), (req, res) => {

    const { agentId } = req.params

    User
        .findById(agentId)
        .select('id username assignedMission medals')

        .populate({
            path: 'assignedMission',
            select: 'codename target objective plan status',
            populate: [
                { path: 'target', select: 'name' },
                { path: 'plan' }
            ]
        })
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error fetching agent.', err }))
})

//Award one agent
router.put('/award/:agentId', checkRoles('director'), (req, res) => {

    const { agentId } = req.params
    
    User
        .findByIdAndUpdate(agentId, {$inc: {'medals': 1}}, {new: true})
        .then(response => res.json({ message: `Mission completed & Agent ${response.username} has been awarded 1 medal.` }))
        .catch(err => res.status(500).json({ code: 500, message: 'Error editing agent.', err }))

})

//Delete agent
router.delete('/:agentId', checkRoles('director'), (req, res) => {

    const { agentId } = req.params

    User
        .findById(agentId)
        .then(response => response.assignedMission ? Mission.findByIdAndDelete(response.assignedMission) : undefined )
        .then(() => User.findByIdAndDelete(agentId))
        .then(() => res.json({ message: 'Agent (and its assigned mission) deleted successfully.' }))
        .catch(err => res.status(500).json({ code: 500, message: 'Error deleting agent.', err }))  
})


module.exports = router