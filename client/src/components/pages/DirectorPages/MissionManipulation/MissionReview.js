import './../Director.css'
import { Component } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import MissionService from '../../../../service/mission.service'
import AgentManipulationService from '../../../../service/agentManipulation.service'

import MissionAgentCard from './MissionAgentCard'
import MissionTargetCard from './MissionTargetCard'
import MissionStatus from './MissionStatus'

class MissionReview extends Component {

    constructor() {
        super()
        this.state = {
            mission: undefined
        }
        this.missionService = new MissionService()
        this.agentManipulationService = new AgentManipulationService()
    }

    componentDidMount() {
        this.loadMission()
    }

    loadMission() {

        const { missionId } = this.props.match.params

        this.missionService
            .getOneMission(missionId)
            .then(response => {
                this.setState({ mission: response.data })
            })
            .catch(err => this.props.handleAlert(err.response.data.message))
    }

    deleteMission(message) {

        const { missionId } = this.props.match.params

        this.missionService
            .deleteOneMission(missionId)
            .then(response => {
                if(message) this.props.handleAlert(response.data.message)
                this.props.history.push('/directorLandingPage')
            })
            .catch(err => this.props.handleAlert(err.response.data.message))
    }

    approveMission() {

        const { missionId } = this.props.match.params

        this.missionService
            .updateOneMissionStatus(missionId, 'approved')
            .then(response => {
                this.props.handleAlert(response.data.message)
                this.loadMission()
            })
            .catch(err => this.props.handleAlert(err.response.data.message))
    }

    rejectMission() {

        const { missionId } = this.props.match.params

        this.missionService
            .updateOneMissionStatus(missionId, 'rejected')
            .then(response => {
                this.props.handleAlert(response.data.message)
                this.loadMission()
            })
            .catch(err => this.props.handleAlert(err.response.data.message))
    }

    awardAgentAndDeleteMission() {
        this.awardAgent()
        this.deleteMission(false)
    }

    awardAgent() {

        const agentId = this.state.mission.agent._id

        this.agentManipulationService
            .awardOneAgent(agentId)
            .then(response => this.props.handleAlert(response.data.message))
            .catch(err => this.props.handleAlert(err.response.data.message))
    }


    render() {
        return (
            <Container>
                {
                    !this.state.mission ?
                        <h1>LOADING MISSION</h1>
                    :
                        <>
                            <Row className="justify-content-between">
                                <Col md={5}>
                                    <h1>MISSION: {this.state.mission.codename}</h1>
                                    <h3>ASSIGNED AGENT:</h3>
                                    <MissionAgentCard agent={this.state.mission.agent} />
                                    <MissionStatus 
                                        status={this.state.mission.status}
                                        agent={this.state.mission.agent}
                                        missionId={this.state.mission._id}
                                        approve={() => this.approveMission()}
                                        reject={() => this.rejectMission()}
                                        awardAndDelete={() => this.awardAgentAndDeleteMission()}
                                        handelAlert={this.props.handleAlert}
                                        isDirector={true}
                                        />
                                </Col>
                                <Col md={6}>
                                    <h2>STATUS: {this.state.mission.status}</h2>
                                    <h3>TARGET:</h3>
                                    <MissionTargetCard target={this.state.mission.target} objective={this.state.mission.objective} />
                                </Col>
                            </Row>
                            <Row className="justify-content-around">
                                <Col md="auto">
                                    <Button variant="dark">
                                        <Link to="/directorLandingPage" className="nav-link">GO BACK</Link>
                                    </Button>
                                </Col>
                                <Col md="auto">
                                    <Button variant="danger" onClick={() => this.deleteMission(true)} >DELETE MISSION</Button>
                                </Col>
                            </Row>
                        </>
                }
            </Container>
        )
    }
}

export default MissionReview