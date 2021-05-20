module.exports = {
    customMiddleware: (req, res, next) => next(),

    isLoggedIn: (req, res, next) => {
        if (req.session.currentUser) {
            next()
        } else {
            res.json({ message: 'USER HAS UNAUTHORIZED ACCESS.' })
        }
    },

    checkRoles: (...allowedRoles) => (req, res, next) => {
        if (allowedRoles.includes(req.session.currentUser.role)) {
            next()
        } else {
            res.json({ message: 'USER HAS UNAUTHORIZED ACCESS.' })
        }
    }
}