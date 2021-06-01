const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt")
const bcryptSalt = 10

const User = require('./../models/user.model')


// Signup (post)
router.post('/signup', (req, res) => {

    const { username, pwd, name } = req.body

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
                .create({ username, password: hashPass, name })
                .then(() => res.json({ code: 200, message: `${response.data.username} registered succesfully!` }))
                .catch(err => res.status(500).json({ code: 500, message: 'DB error while creating user', err }))
        })
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while fetching user', err }))
})


// Login (post)
router.post('/login', (req, res) => {

    const { username, pwd } = req.body

    User
        .findOne({ username })
        .then(user => {

            if (!user) {
                res.status(401).json({ code: 401, message: 'Username not registered', err })
                return
            }

            if (bcrypt.compareSync(pwd, user.password) === false) {
                res.status(401).json({ code: 401, message: 'Incorect password', err })
                return
            }

            req.session.currentUser = user
            res.json(req.session.currentUser)
        })
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while fetching user', err }))
})


// Logout (get)
router.get('/logout', (req, res) => {
    req.session.destroy((err) => res.json({ message: 'Logout successful' }));
})


// isLoggedIn (get)
router.get('/isLoggedIn', (req, res) => {
    req.session.currentUser ? res.json(req.session.currentUser) : res.status(401).json({ code: 401, message: 'Unauthorized access' })
})


// isCitizen (get)
router.get('/isCitizen', (req, res) => {
    req.session.currentUser.role === 'citizen' ? res.json(req.session.currentUser) : res.status(401).json({ code: 401, message: 'Unauthorized access' })
})


// isDirector (get)
router.get('/isDirector', (req, res) => {
    req.session.currentUser.role === 'director' ? res.json(req.session.currentUser) : res.status(401).json({ code: 401, message: 'Unauthorized access' })
})


// isAgent (get)
router.get('/isAgent', (req, res) => {
    req.session.currentUser.role === 'agent' ? res.json(req.session.currentUser) : res.status(401).json({ code: 401, message: 'Unauthorized access' })
})


module.exports = router