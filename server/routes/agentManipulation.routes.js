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
                res.status(400).json({ code: 400, message: 'Username already exixts' })
                return
            }

            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(pwd, salt)

            User
                .create({ username, password: hashPass, role: 'agent' })
                .then(() => res.json({ code: 200, message: 'Agent created' }))
                .catch(err => res.status(500).json({ code: 500, message: 'DB error while creating agent user', err }))
        })
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while fetching user', err }))
})

//Show all agents
router.get('/', checkRoles('director'), (req, res) => {
    User
        .find({ role: 'agent' })
        .select('username medals assignedMission')
        .populate('assignedMission', {codename: 1})
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error fetching users', err }))
})

//Show one agent's details
router.get('/:agentId', checkRoles('director'), (req, res) => {

    const { agentId } = req.params

    User
        .findById(agentId)
        .select('id username assignedMission medals')

        .populate({
            path: 'assignedMission',
            select: 'codename targets objective plan status',
            populate: [
                { path: 'targets', select: 'name' },
                { path: 'plan' }
            ]
        })
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error fetching agent', err }))
})

//Delete agent
router.delete('/:agentId', checkRoles('director'), (req, res) => {

    const agentId = req.params

    User
        .findByIdAndDelete(agentId)
        .then(() => res.json({ mesage: 'Agent deleted successfully' }))
        .catch(err => res.status(500).json({ code: 500, message: 'Error deleting Agent', err }))
})


module.exports = router