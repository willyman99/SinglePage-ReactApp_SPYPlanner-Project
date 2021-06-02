const express = require('express')
const router = express.Router()

const User = require('../models/user.model')
const PlanBlock = require('./../models/planBlock.model')
const Mission = require('../models/mission.model')
const MissionPlanBlock = require('./../models/missionPlanBlock.model')

const { checkRoles } = require('../middlewares')


//Show all users
router.get('/allUsers', (req, res) => {

    switch (req.session.currentUser.role) {

        case 'citizen':
        case 'director':
            User
                .find({ $and: [ { role: 'citizen' }, { _id: {$ne: req.session.currentUser._id}} ] })
                .select('id username name friends plans')
                .populate('plans')
                .then(response => res.json(response))
                .catch(err => res.status(500).json({ code: 500, message: 'Error fetching users.', err }))
            break
        
        case 'agent':
            res.json({message: 'Agents are alone.'})
            break
    }
})


//Get one user's full info
router.get('/user/:userId', checkRoles('director', 'agent'), (req, res) => {

    const { userId } = req.params
    console.log(userId)

    User
        .findById(userId)
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error fetching user.', err }))
})


//Current user's profile
router.get('/profile', (req, res) => {

    switch (req.session.currentUser.role) {

        case 'citizen':
        case 'director': //no

            User
                .findById(req.session.currentUser._id)
                .select('id username name friends plans')
                .populate('friends', {id: 1, username: 1, name: 1})
                .populate([
                    {
                        path: 'plans',
                        model: 'PlanBlock',
                        populate: {
                            path: 'participants',
                            model: 'User',
                            select: 'id username name'
                        }
                    }
                ])
                .then(response => res.json(response))
                .catch(err => res.status(500).json({ code: 500, message: 'Error fetching user.', err }))
            break
        
        case 'agent':
            User
                .findById(req.session.currentUser._id)
                .select('id username assignedMission medals')
                .populate('assignedMission', {codename: 1})
                .then(response => res.json(response))
                .catch(err => res.status(500).json({ code: 500, message: 'Error fetching user', err }))
            break
    }
})


//Change name
router.put('/changeName', (req, res) => {

    const { name } = req.body

    switch (req.session.currentUser.role) {

        case 'citizen':
        case 'director':
            User
                .findByIdAndUpdate(req.session.currentUser._id, { name }, {new: true})
                .then(response => {
                    req.session.currentUser = response
                    res.json(response)
                })
                .catch(err => res.status(500).json({ code: 500, message: 'Error editing user.', err }))
            break
        
        case 'agent':
            res.json({message: "Agents can't change name."})
            break
    }
})


//Add a friend
router.put('/addFriend', (req, res) => {

    const { friendId } = req.body

    switch (req.session.currentUser.role) {

        case 'citizen':
        case 'director':
            User
                .findByIdAndUpdate(friendId, { $push: { friends: req.session.currentUser._id } })
                .then(() => User.findByIdAndUpdate(req.session.currentUser._id, { $push: { friends: friendId } }, { new: true }))
                .then(response => {
                    req.session.currentUser = response
                    res.json(response)
                })
                .catch(err => res.status(500).json({ code: 500, message: 'Error editing users.', err }))
            break
        
        case 'agent':
            res.json({message: "Agents can't have friends."})
            break
    }
})


//Remove a friend
router.put('/removeFriend', (req, res) => {

    const { friendId } = req.body

    switch (req.session.currentUser.role) {

        case 'citizen':
        case 'director':
            User
            .findByIdAndUpdate(friendId, { $pull: { friends: req.session.currentUser._id } })
            .then(() => User.findByIdAndUpdate(req.session.currentUser._id, { $pull: { friends: friendId } }, { new: true }))
            .then(response => {
                req.session.currentUser = response
                res.json(response)
            })
            .catch(err => res.status(500).json({ code: 500, message: 'Error editing user.', err }))
            break
        
        case 'agent':
            res.json({message: "Agents have no friends."})
            break
    }
})


//Delete One User
router.delete('/:userId', checkRoles('director'), (req, res) => {

    const { userId } = req.params
    const promisesArray = []

    User
        .findById(userId)
        .then(response => {
            response.friends.forEach(elm => {
                promisesArray.push(User.findByIdAndUpdate(elm, { $pull: { friends: userId } }))
            })

            return Promise.all(promisesArray)
        })
        .then(() => User.findByIdAndDelete(userId))
        .then(() => res.json({ message: 'User deleted successfully.' }))
        .catch(err => res.status(500).json({ code: 500, message: 'Error deleting User.', err }))   
})



module.exports = router