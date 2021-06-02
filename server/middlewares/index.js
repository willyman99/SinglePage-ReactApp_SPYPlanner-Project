module.exports = {
    customMiddleware: (req, res, next) => next(),

    isLoggedIn: (req, res, next) => {
        if (req.session.currentUser) {
            next()
        } else {
            res.status(500).json({ message: 'UNAUTHORIZED ACCESS.' })
        }
    },

    checkRoles: (...allowedRoles) => (req, res, next) => {
        if (allowedRoles.includes(req.session.currentUser.role)) {
            next()
        } else {
            res.status(500).json({ message: 'UNAUTHORIZED ACCESS.' })
        }
    }
}