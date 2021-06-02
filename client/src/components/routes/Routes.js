import { Switch, Route, Redirect } from 'react-router-dom'
//import checkRoles from './../../Utilities/checkRoles'

import LandingPage from '../pages/Index/LandingPage'
import Signup from '../pages/Signup/Signup'
import Login from '../pages/Login/Login'

import Profile from '../pages/CitizenPages/Profile/Profile'
import Friends from '../pages/CitizenPages/Profile/Friends'
    
import Planner from '../pages/CitizenPages/Planner/Planner'
import FullPlanBlock from '../pages/CitizenPages/Planner/FullPlanBlock'
import NewPlanBlockForm from '../pages/CitizenPages/Planner/NewPlanBlockForm'

import DirectorLandingPage from '../pages/DirectorPages/DirectorLandingPage'
import NewMissionForm from '../pages/DirectorPages/MissionManipulation/NewMissionForm'
import MissionReview from '../pages/DirectorPages/MissionManipulation/MissionReview'
import NewAgentForm from '../pages/DirectorPages/AgentManipulation/NewAgentForm'

import AgentLandingPage from '../pages/AgentPages/AgentLandingPage'


const Routes = ({ storeUser, loggedUser, logout, handleAlert }) => {

    const checkRoles = (...allowedRoles) => loggedUser && allowedRoles.includes(loggedUser.role)


    return (
        <Switch>
            <Route path="/" exact render={() => <LandingPage />} />

            <Route path="/signup" render={props => <Signup history={props.history} handleAlert={handleAlert} />} />
            <Route path="/login" render={props => <Login history={props.history} handleAlert={handleAlert} storeUser={storeUser}/>} />

            
            <Route path="/profile" exact render={() => checkRoles('citizen', 'director') ? <Profile loggedUser={loggedUser} logout={logout} handleAlert={handleAlert} storeUser={storeUser} /> : <Redirect to="/login" />} />
            <Route path="/profile/friends" render={() => checkRoles('citizen', 'director') ? <Friends loggedUser={loggedUser} handleAlert={handleAlert} storeUser={storeUser}/> : <Redirect to="/login" />} />

            <Route path="/planner" exact render={() => checkRoles('citizen', 'director') ? <Planner loggedUser={loggedUser} handleAlert={handleAlert}/> : <Redirect to="/login" />} />
            <Route path="/planner/createForm" render={props => checkRoles('citizen', 'director') ? <NewPlanBlockForm loggedUser={loggedUser} {...props} handleAlert={handleAlert} /> : <Redirect to="/login" />} />
            <Route path="/planner/:planBlockId" render={props => checkRoles('citizen', 'director') ? <FullPlanBlock loggedUser={loggedUser} {...props} handleAlert={handleAlert} /> : <Redirect to="/login" />} />

            
            <Route path="/directorLandingPage" render={() => checkRoles('director') ? <DirectorLandingPage loggedUser={loggedUser} handleAlert={handleAlert}/> : <Redirect to="/login" />} />

            <Route path="/agents/createForm" render={props => checkRoles('director') ? <NewAgentForm loggedUser={loggedUser} {...props} handleAlert={handleAlert} /> : <Redirect to="/login" />} />
            <Route path="/mission/createForm" render={props => checkRoles('director') ? <NewMissionForm loggedUser={loggedUser} {...props} handleAlert={handleAlert} /> : <Redirect to="/login" />} />
            <Route path="/mission/:missionId" render={props => checkRoles('director') ? <MissionReview loggedUser={loggedUser} {...props} handleAlert={handleAlert} /> : <Redirect to="/login" />} />

            

            <Route path="/agentLandingPage" render={() => checkRoles('agent') ? <AgentLandingPage loggedUser={loggedUser}/> : <Redirect to="/login" />} />


        </Switch>
    )
}

export default Routes