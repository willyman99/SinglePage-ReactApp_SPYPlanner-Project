const express = require('express')
const router = express.Router()

const User = require('../models/user.model')
const PlanBlock = require('../models/planBlock.model')


//Create Plan Block
router.post('/addBlock', (req, res) => {

    const { title, description, participants } = req.body
    const promisesArray = []

    PlanBlock
        .create({ title, description, participants })
        .then(response => {

            response.participants.forEach(elm => {
                promisesArray.push(User.findByIdAndUpdate(elm, { $push: { plans: response.id } }))
            })

            return Promise.all(promisesArray)
        })
        .then(() => res.json({ message: 'PlanBlock created succesfully.'}))
        .catch(err => res.status(500).json({ code: 500, message: "Error creating & saving PlanBlock.", err }))
})

//Read all of current user's Plan Blocks
router.get('/', (req, res) => {
    User
        .findById(req.session.currentUser._id)
        .select('plans')
        .populate([{
            path: 'plans',
            model: 'PlanBlock',
            populate: {
                path: 'participants',
                model: 'User',
                select: 'id username name'
            }
        }])
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error fetching user plans.', err }))
})

//Read all of a user's Plan Blocks
router.get('/allPlanBlocks/:userId', (req, res) => {

    const {userId} = req.params

    User
        .findById(userId)
        .select('plans')
        .populate([{
            path: 'plans',
            model: 'PlanBlock',
            populate: {
                path: 'participants',
                model: 'User',
                select: 'id name'
            }
        }])
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error fetching user plans.', err }))
})


//Read one Plan Block
router.get('/planBlock/:planBlockId', (req, res) => {

    const {planBlockId} = req.params

    PlanBlock
        .findById(planBlockId)
        .populate('participants', {id: 1, username: 1, name: 1})
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error fetching PlanBlock.', err }))
})


//Update Plan Block
router.put('/:planBlockId', (req, res) => {

    const {planBlockId} = req.params
    const { title, description, participants } = req.body

    PlanBlock
        .findByIdAndUpdate(planBlockId, { title, description, participants }, {new: true})
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error editing PlanBlock.', err }))
})


//Delete Plan Block
router.delete('/:planBlockId', (req, res) => {

    const { planBlockId } = req.params
    const promisesArray = []

    PlanBlock
        .findById(planBlockId)
        .then(response => {
            response.participants.forEach(elm => {
                promisesArray.push(User.findByIdAndUpdate(elm, { $pull: { plans: planBlockId } }))
            })

            return Promise.all(promisesArray)
        })
        .then(() => PlanBlock.findByIdAndDelete(planBlockId))
        .then(() => res.json({ message: 'PlanBlock deleted successfully.' }))
        .catch(err => res.status(500).json({ code: 500, message: 'Error deleting PlanBlock.', err })) 
})


module.exports = router