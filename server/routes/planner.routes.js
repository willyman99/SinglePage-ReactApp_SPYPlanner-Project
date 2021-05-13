const express = require('express')
const router = express.Router()

const User = require('./../models/user.model')
const PlanBlock = require('./../models/planBlock.model')

//Create Plan Block
router.post('/addBlock', (req, res) => {

    const planBlock = req.body

    PlanBlock
        .create(planBlock)
        .then(response => User.findByIdAndUpdate(req.session.currentUser._id, { $push: { plans: response.id } }))
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error saving PlanBlock', err }))
})


//Read one Plan Block
router.get('/:planBlockId', (req, res) => {
    PlanBlock
        .findById(req.params.planBlockId)
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error fetching PlanBlock', err }))
})

//Read all of current user's Plan Blocks
router.get('/', (req, res) => {
    User
        .findById(req.session.currentUser._id)
        .select('plans')
        .populate('plans')
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error fetching user plans', err }))
})


//Update Plan Block
router.put('/:planBlockId/edit', (req, res) => {
    PlanBlock
        .findByIdAndUpdate(req.params.planBlockId, req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error editing PlanBlock', err }))
})


//Delete Plan Block
router.put('/:planBlockId/delete', (req, res) => {
    PlanBlock
        .findByIdAndDelete(req.params.planBlockId, req.body)
        .then(() => res.json({ mesage: 'Plan Block deleted successfully' }))
        .catch(err => res.status(500).json({ code: 500, message: 'Error deleting PlanBlock', err }))
})