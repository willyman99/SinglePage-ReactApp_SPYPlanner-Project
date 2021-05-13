const express = require('express')
const router = express.Router()

const User = require('../models/user.model')


//Show all users
router.get('allUsers', (req, res) => {
    if (req.session.currentUser.role === 'citizen') {
        User
            .find({ role: 'citizen' })
            .select('id username name')
            .then(response => res.json(response))
            .catch(err => res.status(500).json({ code: 500, message: 'Error fetching users', err }))
    }
    else if (req.session.currentUser.role === 'director') {
        User
            .find()
            .then(response => res.json(response))
            .catch(err => res.status(500).json({ code: 500, message: 'Error fetching users', err }))
    }
})


//Current user's profile
router.get('/', (req, res) => {
    if (req.session.currentUser.role === 'citizen') {
        User
        .findById(req.session.currentUser._id)
        .select('id username name friends plans')
        .populate('friends')
        .populate('plans')
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error fetching user', err }))
    }
    else if (req.session.currentUser.role === 'director') {
        User
        .findById(req.session.currentUser._id)
        .populate('missions')
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error fetching user', err }))
    }
})


//Change name
router.put('nameChange/:userId', (req, res) => {
    User
        .findByIdAndUpdate(req.params.userId, req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error editing user', err }))
})


//Add a friend
router.put('addFriend/:userId', (req, res) => {
    User
        .findByIdAndUpdate({ _id: req.params.userId }, { $push: { friends: req.body }})
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error editing user', err }))
})


//Remove a friend
router.put('removeFriend/:userId', (req, res) => {
    User
        .findByIdAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.body }})
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error editing user', err }))
})


module.exports = router