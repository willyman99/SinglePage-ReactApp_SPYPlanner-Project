import '.././Agent.css'
import { Component } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import MissionPlanBlocksList from './../MissionPlanner/MissionPlanBlocksList'
import TargetPlanBlocksList from './TargetPlanBlocksList'

import MissionService from './../../../../service/mission.service'

class AgentLandingPage extends Component {

    constructor() {
        super()
        this.state = {
            mission: ''
        }
        this.missionService = new MissionService()
    }

    componentDidMount() {
        this.loadMission()
    }

    loadMission() {
        this.missionService
            .getAssignedMission()
            .then(response => this.setState({ mission: response.data }) )
            .catch(err => this.props.handleAlert(err.response.data.message))
    }

    statusDependentNode(status) {
        switch (status) {
            case 'pending':
                return 'AWAITING DIRECTOR REVIEW, YOUR PLANS COULD BE APPROVED OR REJECTED.'
            case 'rejected':
                return 'MISSION PLAN HAS BEEN REJECTED. TRY CHANGING, DELETING, OR ADDING TO YOUR MISSION PLAN.'
            case 'approved':
                return 'MISSION APPROVED. NOW EXECUTE! ONCE DONE, DIRECTOR WILL AWARD (1) MEDAL.'
            case 'unplanned':
            default:
                return 'MAKE A MISSION PLAN FOR THE DIRECTOR TO REVIEW.'
        }
    }

    render() {

        const mission = this.state.mission ? this.state.mission : undefined
        
        return (
            <>
                {!mission ?
                    <h1>LOADING ASSIGNED MISSION</h1>
                    :
                    <Container>
                        <Row>
                            <h1>MISSION_: {mission.codename.toUpperCase()}</h1>
                            <hr />
                            <>
                                {
                                    mission.status !== 'approved' ?
                                        <>
                                            <span>DIRECTIVE_: PREPARE A PLAN TO {mission.objective.toUpperCase()} {mission.target.name.toUpperCase()} FOR THE DIRECTOR TO REVIEW. </span>
                                            <span>IF THE DIRECTOR APPROVES THE MISSION PLAN, EXECUTE MISSION AND EXPECT TO RECEIVE A MEDAL.</span>
                                        </>
                                        :
                                        <>
                                            <h1>EXECUTE!</h1>
                                            <span>DIRECTIVE_: FOLLOW YOUR MISSION PLAN AND {mission.objective.toUpperCase()} {mission.target.name.toUpperCase()}! </span>
                                        </>

                                }
                            </>
                            <hr />
                        </Row>
                        <Row>
                            <Col md={6}>
                                <h2>'TARGET PROFILE PIC'</h2>
                                <hr/>
                                <h1>TARGET_: {mission.target.name.toUpperCase()}</h1>
                                <hr/>
                                <h2>(ALIAS_: {mission.target.username.toUpperCase()})</h2>
                                <hr/>
                                <h2>POPULARITY_: {mission.target.friends.length}</h2>
                                <hr/>
                                <h2>LAST KNOWN LOCATION_: ___</h2>
                                <hr/>
                                <h2>KNOWN ASSOCIATES:</h2>
                                <ul>
                                    {mission.target.friends.map(elm => <li key={elm._id}>{elm.name}</li>)}
                                </ul>
                                <hr/>
                                {
                                    !mission.target ?
                                        <h1>LOADING TARGET'S PLANBLOCKS</h1>
                                        :
                                        <TargetPlanBlocksList targetId={mission.target._id} missionStatus={mission.status} handleAlert={this.props.handleAlert} />
                                }
                            </Col>

                            <Col md={6}>
                                <h2>MISSION_OBJECTIVE_: {mission.objective.toUpperCase()}</h2>
                                <hr />
                                <h2>MISSION_STATUS_: {mission.status.toUpperCase()}</h2>
                                <span>{this.statusDependentNode(mission.status)}</span>
                                {
                                    mission.status !== 'approved' ?
                                        <Button variant="dark">
                                            <Link to="/missionPlanBlock/createForm" className="nav-link">MAKE A PLAN BLOCK</Link>
                                        </Button>
                                        :
                                        <h1>MISSION HAS BEEN APPROVED. YOU CANNOT MAKE ANYMORE CHANGES. JUST EXECUTE!</h1>
                                }
                                <hr/>
                                {
                                    !mission.plan ?
                                        <h1>LOADING MISSION PLANBLOCKS</h1>
                                        :
                                        <MissionPlanBlocksList missionId={mission._id} missionStatus={mission.status} handleAlert={this.props.handleAlert} />
                                }
                            </Col>
                        </Row>
                        <Row>
                            <Button variant="dark">
                                    <Link to="/agentLandingPage" className="nav-link">GO BACK</Link>
                            </Button>
                        </Row>
                    </Container>
                }
            </>
    )
    }
}

export default AgentLandingPage