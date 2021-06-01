import { Switch, Route, Redirect } from 'react-router-dom'

import LandingPage from '../pages/Index/LandingPage'
import Signup from '../pages/Signup/Signup'
import Login from '../pages/Login/Login'

import Profile from '../pages/CitizenPages/Profile/Profile'
import Friends from '../pages/CitizenPages/Profile/Friends'
    
import Planner from '../pages/CitizenPages/Planner/Planner'
import FullPlanBlock from '../pages/CitizenPages/Planner/FullPlanBlock'
import NewPlanBlockForm from '../pages/CitizenPages/Planner/NewPlanBlockForm'


import AgentLandingPage from '../pages/AgentPages/AgentLandingPage'


import DirectorLandingPage from '../pages/DirectorPages/DirectorLandingPage'



const Routes = ({ storeUser, loggedUser, logout, handleAlert }) => {


    const checkRoles = (...allowedRoles) => {
        return loggedUser ? allowedRoles.includes(loggedUser.role) : false
    }

    return (
        <Switch>
            <Route path="/" exact render={() => <LandingPage />} />

            <Route path="/signup" render={props => <Signup history={props.history} handleAlert={handleAlert}/>} />
            <Route path="/login" render={props => <Login history={props.history} handleAlert={handleAlert} storeUser={storeUser} />} />

            
            <Route path="/profile" exact render={props => checkRoles('citizen', 'director') ? <Profile loggedUser={loggedUser} logout={logout} handleAlert={handleAlert} storeUser={storeUser} /> : <Redirect to="/login" />} />
            <Route path="/profile/friends" render={props => checkRoles('citizen', 'director') ? <Friends loggedUser={loggedUser} handleAlert={handleAlert} storeUser={storeUser}/> : <Redirect to="/login" />} />

            <Route path="/planner" exact render={props => checkRoles('citizen', 'director') ? <Planner loggedUser={loggedUser} /> : <Redirect to="/login" />} />
            <Route path="/planner/createForm" render={props => checkRoles('citizen', 'director') ? <NewPlanBlockForm loggedUser={loggedUser} {...props} handleAlert={handleAlert} storeUser={storeUser}/> : <Redirect to="/login" />} />
            <Route path="/planner/:planBlockId" render={props => checkRoles('citizen', 'director') ? <FullPlanBlock loggedUser={loggedUser} {...props} handleAlert={handleAlert} storeUser={storeUser}/> : <Redirect to="/login" />} />

            
            <Route path="/directorLandingPage" render={props => checkRoles('director') ? <DirectorLandingPage loggedUser={loggedUser} /> : <Redirect to="/login" />} />
            

            <Route path="/agentLandingPage" render={props => checkRoles('agent') ? <AgentLandingPage loggedUser={loggedUser}/> : <Redirect to="/login" />} />


        </Switch>
    )
}

export default Routes