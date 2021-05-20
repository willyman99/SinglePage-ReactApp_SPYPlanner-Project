module.exports = app => {

    // Base URLS
    app.use('/auth', require('./auth.routes.js'))
    app.use('/', require('./user.routes.js'))
    app.use('/agents', require('./agentManipulation.routes.js'))
    app.use('/planner', require('./planner.routes.js'))
    app.use('/mission', require('./missionPlanner.routes.js'))
    app.use('/mission', require('./mission.routes.js'))

}