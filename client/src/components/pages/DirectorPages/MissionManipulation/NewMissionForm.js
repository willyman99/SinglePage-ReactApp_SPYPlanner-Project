import './../Director.css'

import { Component } from 'react'
import { Form, Button, Container, Row, Col, Dropdown, DropdownButton } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import MissionService from './../../../../service/mission.service'
import AgentManipulationService from './../../../../service/agentManipulation.service'
import UserService from './../../../../service/user.service'


class NewMissionForm extends Component {

    constructor() {
        super()
        this.state = {
            allCitizens: '',
            allAgents: '',
            codename: '',
            agent: undefined,
            objective: undefined,
            target: undefined,
            targetName: undefined,
            agentName: undefined,
            targetUsername: undefined,
            agentMedals: undefined
        }
        this.missionService = new MissionService()
        this.agentManipulationService = new AgentManipulationService()
        this.userService = new UserService()

        this.possibleObjectives = [
            { text: 'MONITOR', value: 'monitor' },
            { text: 'KILL', value: 'kill' },
            { text: 'PROTECT', value: 'protect' },
            { text: 'ROB', value: 'rob' },
            { text: 'EXTRACT', value: 'extract' },
            { text: 'IMPERSONATE', value: 'impersonate' }
        ]
    }

    componentDidMount() {
        
        const query = this.props.location.search
        if (query.includes('target')) { this.extractTarget(query) }
        if (query.includes('agent')) { this.extractAgent(query) }

        this.loadAllCitizens()
        this.loadAllAgents()
    }

    extractTarget(string) {
        const targetId = string.replace('?target=', '')
        this.addTarget(targetId)
    }

    extractAgent(string) {
        const agentId = string.replace('?agent=', '')
        this.addAgent(agentId)
    }

    addTarget(targetId) {
        this.userService
            .getOneUser(targetId)
            .then(response => {
                this.setState({ target: response.data._id })
                this.setState({ targetName: response.data.name })
                this.setState({ targetUsername: response.data.username })
            })
            .catch(err => this.props.handleAlert(err.response.data.message))
    }

    addAgent(agentId) {
        this.agentManipulationService
            .getOneAgent(agentId)
            .then(response => {
                this.setState({ agent: response.data._id })
                this.setState({ agentName: response.data.username })
                this.setState({ agentMedals: response.data.medals })
            })
            .catch(err => this.props.handleAlert(err.response.data.message))
    }

    cancelTarget() {
        this.setState({ target: undefined })
        this.setState({ targetName: undefined })
        this.setState({ targetUsername: undefined })
    }

    cancelAgent() {
        this.setState({ agent: undefined })
        this.setState({ agentName: undefined })
        this.setState({ agentMedals: undefined })
    }


    loadAllCitizens() {
        this.userService
            .getAllUsers()
            .then(response => this.setState({ allCitizens: response.data }))
            .catch(err => this.props.handleAlert(err.response.data.message))
    }

    loadAllAgents() {
        this.agentManipulationService
            .getAllAgents()
            .then(response => {
                const unassignedAgents = response.data.filter(elm => !elm.assignedMission)
                this.setState({ allAgents: unassignedAgents })
            })
            .catch(err => this.props.handleAlert(err.response.data.message))
    }


    handleInputChange(e) {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleSubmit(e) {
        e.preventDefault()

        const { objective, codename, target, agent } = this.state
        codename.toUpperCase()

        this.missionService
            .assignMission({ objective, codename, target, agent })
            .then(response => {
                this.props.handleAlert(response.data.message)
                this.props.history.push('/directorLandingPage')
            })
            .catch(err => this.props.handleAlert(err.response.data.message))
    }


    render() {

        return (

            <Container>
                <Form onSubmit={e => this.handleSubmit(e)}>
                    <Row>
                        <Col md={6}>
                            <Form.Group controlId="codename">
                                <Form.Label>MISSION CODENAME:</Form.Label>
                                <Form.Control type="text" value={this.state.codename ? this.state.codename.toUpperCase() : this.state.codename} onChange={e => this.handleInputChange(e)} name="codename" />
                            </Form.Group>
                            <hr/>
                        </Col>
                        <Col md={6}>
                            {
                                this.state.agent ?
                                    <>
                                        <h1>ASSIGNED AGENT:</h1>
                                        <h1>{this.state.agentName ? this.state.agentName.toUpperCase() : this.state.agentName} | MEDALS: {this.state.agentMedals}</h1>
                                        <Button variant="danger" onClick={() => this.cancelAgent()}>X</Button>
                                    </>
                                :
                                    <>
                                        {
                                            !this.state.allAgents ?
                                                <h1>LOADING AGENTS</h1>
                                            :
                                            <DropdownButton menuAlign="right" title="ASSIGN" id="agent-dropdown" >
                                                {this.state.allAgents.map(elm =>
                                                    <Dropdown.Item
                                                        key={elm._id}
                                                        name="agent"
                                                        value={elm._id}
                                                        onSelect={() => this.addAgent(elm._id)}
                                                    >
                                                        AGENT: {elm.username.toUpperCase()} | MEDALS: {elm.medals}
                                                    </Dropdown.Item>
                                                )}
                                            </DropdownButton>
                                        }
                                    </>
                            }
                            <hr/>
                        </Col>
                    </Row>

                    <Form.Group id="objective-radio">
                        <Form.Label>MISSION OBJECTIVE: </Form.Label>
                        {this.possibleObjectives.map(elm =>
                            <Form.Check
                                inline
                                label={elm.text}
                                value={elm.value}
                                name="objective"
                                type="radio"
                                key={`${elm.text}-option`}
                                onChange={e => this.handleInputChange(e)}
                            />
                        )}
                    </Form.Group>
                    <hr/>

                    {
                        this.state.target ?
                            <>
                                <h1>TARGET{this.state.objective ? ` TO ${this.state.objective.toUpperCase()}` : ''}:</h1>
                                <h1>{this.state.targetName ? this.state.targetName.toUpperCase() : this.state.targetName} aka {this.state.targetUsername ? this.state.targetUsername.toUpperCase() : this.state.targetUsername}</h1>
                                <Button variant="danger" onClick={() => this.cancelTarget()}>X</Button>
                            </>
                        :
                            <>
                                {
                                    !this.state.allCitizens ?
                                        <h1>LOADING CITIZENS</h1>
                                    :
                                    <DropdownButton menuAlign="right" title={`TARGET${this.state.objective ? ` TO ${this.state.objective.toUpperCase()}` : ''}:`} id="target-dropdown" >
                                        {this.state.allCitizens.map(elm =>
                                            <Dropdown.Item
                                                key={elm._id}
                                                name="target"
                                                value={elm._id}
                                                onSelect={() => this.addTarget(elm._id)}
                                            >
                                                {elm.name.toUpperCase()} aka {elm.username.toUpperCase()}
                                            </Dropdown.Item>
                                        )}
                                    </DropdownButton>
                                }
                            </>
                    }
                    <hr />

                    <Button variant="dark" style={{ width: '100%', marginTop: '20px' }} type="submit"> CREATE & ASSIGN MISSION </Button>
                    <Button variant="dark">
                        <Link to="/directorLandingPage" className="nav-link">CANCEL & GO BACK</Link>
                    </Button>
                </Form>
            </Container>
        )
    }
}

export default NewMissionForm