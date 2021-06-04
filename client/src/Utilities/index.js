module.exports = {

    checkRoles: (loggedUser, ...allowedRoles) => loggedUser && allowedRoles.includes(loggedUser.role)

}
