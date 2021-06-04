import { Switch, Route, Redirect } from 'react-router-dom'
import { checkRoles } from './../../Utilities/'

import LandingPage from '../pages/Index/LandingPage'
import Signup from '../pages/Signup/Signup'
import Login from '../pages/Login/Login'

import Profile from '../pages/CitizenPages/Profile/Profile'
import Friends from '../pages/CitizenPages/Profile/Friends'
    
import Planner from '../pages/CitizenPages/Planner/Planner'
import FullPlanBlock from '../pages/CitizenPages/Planner/FullPlanBlock'
import NewPlanBlockForm from '../pages/CitizenPages/Planner/NewPlanBlockForm'

import DirectorLandingPage from '../pages/DirectorPages/DirectorLandingPage'
import NewAgentForm from '../pages/DirectorPages/AgentManipulation/NewAgentForm'
import NewMissionForm from '../pages/DirectorPages/MissionManipulation/NewMissionForm'
import MissionReview from '../pages/DirectorPages/MissionManipulation/MissionReview'
import MissionPlan from '../pages/DirectorPages/MissionManipulation/MissionPlan'

import AgentLandingPage from '../pages/AgentPages/AgentLandingPage'
import AssignedMission from '../pages/AgentPages/FullMission/AssignedMission'

import NewMissionPlanBlockForm from '../pages/AgentPages/MissionPlanner/NewMissionPlanBlockForm'


const Routes = ({ storeUser, loggedUser, logout, handleAlert }) => {

    return (
        <Switch>
            <Route path="/" exact render={() => <LandingPage />} />

            <Route path="/signup" render={props => <Signup history={props.history} handleAlert={handleAlert} />} />
            <Route path="/login" render={props => <Login history={props.history} handleAlert={handleAlert} storeUser={storeUser}/>} />

            
            <Route path="/profile" exact render={() => checkRoles(loggedUser, 'citizen', 'director') ? <Profile loggedUser={loggedUser} logout={logout} handleAlert={handleAlert} storeUser={storeUser} /> : <Redirect to="/login" />} />
            <Route path="/profile/friends" render={() => checkRoles(loggedUser, 'citizen', 'director') ? <Friends loggedUser={loggedUser} handleAlert={handleAlert} storeUser={storeUser}/> : <Redirect to="/login" />} />

            <Route path="/planner" exact render={() => checkRoles(loggedUser, 'citizen', 'director') ? <Planner loggedUser={loggedUser} handleAlert={handleAlert}/> : <Redirect to="/login" />} />
            <Route path="/planner/createForm" render={props => checkRoles(loggedUser, 'citizen', 'director') ? <NewPlanBlockForm loggedUser={loggedUser} {...props} handleAlert={handleAlert} /> : <Redirect to="/login" />} />
            <Route path="/planner/:planBlockId" render={props => checkRoles(loggedUser, 'citizen', 'director') ? <FullPlanBlock loggedUser={loggedUser} {...props} handleAlert={handleAlert} /> : <Redirect to="/login" />} />

            
            <Route path="/directorLandingPage" render={() => checkRoles(loggedUser, 'director') ? <DirectorLandingPage loggedUser={loggedUser} handleAlert={handleAlert}/> : <Redirect to="/login" />} />

            <Route path="/agents/createForm" render={props => checkRoles(loggedUser, 'director') ? <NewAgentForm loggedUser={loggedUser} {...props} handleAlert={handleAlert} /> : <Redirect to="/login" />} />
            <Route path="/mission/createForm" render={props => checkRoles(loggedUser, 'director') ? <NewMissionForm loggedUser={loggedUser} {...props} handleAlert={handleAlert} /> : <Redirect to="/login" />} />
            <Route path="/mission/plan/:missionId" render={props => checkRoles(loggedUser, 'director') ? <MissionPlan loggedUser={loggedUser} {...props} handleAlert={handleAlert} /> : <Redirect to="/login" />} />
            <Route path="/mission/:missionId" render={props => checkRoles(loggedUser, 'director') ? <MissionReview loggedUser={loggedUser} {...props} handleAlert={handleAlert} /> : <Redirect to="/login" />} />


            <Route path="/agentLandingPage" render={() => checkRoles(loggedUser, 'agent') ? <AgentLandingPage loggedUser={loggedUser} handleAlert={handleAlert} /> : <Redirect to="/login" />} />
            <Route path="/assignedMission" render={() => checkRoles(loggedUser, 'agent') ? <AssignedMission loggedUser={loggedUser} handleAlert={handleAlert} /> : <Redirect to="/login" />} />
            
            <Route path="/missionPlanBlock/createForm" render={props => checkRoles(loggedUser, 'agent') ? <NewMissionPlanBlockForm loggedUser={loggedUser} {...props} handleAlert={handleAlert} /> : <Redirect to="/login" /> } />
        </Switch>
    )
}

export default Routes