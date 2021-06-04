import './Agent.css'
import { Component } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import MissionService from '../../../service/mission.service'

class AgentLandingPage extends Component {

    constructor() {
        super()
        this.state = {
            mission: undefined
        }
        this.missionService = new MissionService()
    }

    componentDidMount() {
        this.loadMission()
    }

    loadMission() {
        this.missionService
            .getAssignedMission()
            .then(response => this.setState({ mission: response.data }))
            .catch(err => this.props.handleAlert(err.response.data.message))
    }

    render() {
        const loggedAgent = this.props.loggedUser ? this.props.loggedUser : undefined
        const mission = this.state.mission ? this.state.mission : undefined
        
        return (
            <Container>
                <Row>
                    <Col md={6}>
                        <h1>'PROFILE PCITURE</h1>
                        <h1>AGENT-{loggedAgent.username}</h1>
                        <h2>MEDALS: {loggedAgent.medals}</h2>
                        <h3>STATUS: {!loggedAgent.assignedMission ? `UN` : null}ASSIGNED</h3>
                    </Col>
                    <Col md={6}>
                        <h1>'AGENCY LOGO'</h1>
                    </Col>
                </Row>
                <hr />
                <h1>MISSION:</h1>
                {
                    !mission ?
                        <h1>NO ASSIGNED MISSION</h1>
                        :
                        <Button variant="dark">
                            <Link to="/assignedMission" className="nav-link">ACCESS MISSION {mission.codename}</Link>
                        </Button>
                }
            </Container>
    )
    }
}

export default AgentLandingPage