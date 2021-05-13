module.exports = app => {

    // Base URLS
    app.use('/auth', require('./auth.routes.js'))
    app.use('/', require('./user.routes.js'))
    app.use('/', require('./mission.routes.js'))
    app.use('/planner', require('./planner.routes.js'))
}