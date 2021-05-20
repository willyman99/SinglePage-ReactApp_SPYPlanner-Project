const express = require('express')
const router = express.Router()

const User = require('../models/user.model')
const PlanBlock = require('./../models/planBlock.model')
const Mission = require('../models/mission.model')
const MissionPlanBlock = require('./../models/missionPlanBlock.model')


//Show all users
router.get('/allUsers', (req, res) => {

    switch (req.session.currentUser.role) {

        case 'citizen':
            User
            .find({ role: 'citizen' }) //add AND to not show itself
            .select('id username name')
            .then(response => res.json(response))
            .catch(err => res.status(500).json({ code: 500, message: 'Error fetching users', err }))
            break
        
        case 'director':
            User
            .find({ id: {$ne: req.session.currentUser._id}})
            .then(response => res.json(response))
            .catch(err => res.status(500).json({ code: 500, message: 'Error fetching users', err }))
            break
        
        case 'agent':
            res.json({message: 'Agents are alone.'})
            break
    }
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
                .catch(err => res.status(500).json({ code: 500, message: 'Error fetching user', err }))
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
            .catch(err => res.status(500).json({ code: 500, message: 'Error editing user', err }))
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
            User
            .findByIdAndUpdate(friendId, { $push: { friends: req.session.currentUser._id } })
            .then(() => User.findByIdAndUpdate(req.session.currentUser._id, { $push: { friends: friendId } }, { new: true }))
            .then(response => {
                req.session.currentUser = response
                res.json(response)
            })
            .catch(err => res.status(500).json({ code: 500, message: 'Error editing users', err }))
            break
        
        case 'director':
            res.json({message: "The director has no friends."})
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
            User
            .findByIdAndUpdate(friendId, { $pull: { friends: req.session.currentUser._id } })
            .then(() => User.findByIdAndUpdate(req.session.currentUser._id, { $pull: { friends: friendId } }, { new: true }))
            .then(response => {
                req.session.currentUser = response
                res.json(response)
            })
            .catch(err => res.status(500).json({ code: 500, message: 'Error editing user', err }))
            break
        
        case 'director':
            res.json({message: "The director has no friends."})
            break
        
        case 'agent':
            res.json({message: "Agents have no friends."})
            break
    }
})


module.exports = router