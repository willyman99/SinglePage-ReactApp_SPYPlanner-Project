import './../Agent.css'

import { Component } from 'react'
import { Form, Button, Container, Row, Col, Dropdown, DropdownButton } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import MissionService from './../../../../service/mission.service'
import UserService from './../../../../service/user.service'
import PlannerService from './../../../../service/planner.service'


class NewMissionPlanBlockForm extends Component {

    constructor() {
        super()
        this.state = {
            citizenPlanBlocks: '',
            directive: '',
            targetName: '',
            targetId: '',

            title: '',
            description: '',
            parallelCitizenPlanBlock: '',
            locationName: '',

            parallelCitizenPlanBlockTitle: ''
        }
        this.missionService = new MissionService()
        this.userService = new UserService()
        this.plannerService = new PlannerService()
    }

    componentDidMount() {
        this.loadTargetInfo()

        const query = this.props.location.search
        if (query.includes('parallelTo')) { this.extractParallelCitizenPlanBlock(query) }
    }

    loadTargetInfo() {
        this.missionService
            .getAssignedMission()
            .then(response => {
                this.setState({ targetName: response.data.target.name })
                this.setState({ targetId: response.data.target._id })
                const directive = `${response.data.objective} ${response.data.target.name}.`
                this.setState({ directive: directive.toUpperCase() })
                this.loadAllCitizenPlanBlocks(response.data.target._id)
            })
            .catch(err => this.props.handleAlert(err.response.data.message))
    }

    extractParallelCitizenPlanBlock(string) {
        const parallelCitizenPlanBlockId = string.replace('?parallelTo=', '')
        this.addParallelCitizenPlanBlock(parallelCitizenPlanBlockId)
    }

    addParallelCitizenPlanBlock(parallelCitizenPlanBlockId) {
        this.plannerService
            .getOnePlanBlock(parallelCitizenPlanBlockId)
            .then(response => {
                this.setState({ parallelCitizenPlanBlock: response.data._id })
                this.setState({ parallelCitizenPlanBlockTitle: response.data.title })
            })
            .catch(err => this.props.handleAlert(err.response.data.message))
    }

    loadAllCitizenPlanBlocks(targetId) {
        this.plannerService
            .getSomeUserPlanBlocks(targetId)
            .then(response => {
                this.setState({ citizenPlanBlocks: response.data.plans })
            })
            .catch(err => this.props.handleAlert(err.response.data.message))
    }

    cancelParallelCitizenPlanBlock() {
        this.setState({ parallelCitizenPlanBlock: undefined })
        this.setState({ parallelCitizenPlanBlockTitle: undefined })
    }

    handleInputChange(e) {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleSubmit(e) {
        e.preventDefault()

        const { title, description, parallelCitizenPlanBlock, locationName } = this.state

        this.missionService
            .addMissionBlock({ title, description, parallelCitizenPlanBlock, locationName })
            .then(response => {
                this.props.handleAlert(response.data.message)
                this.props.history.push('/assignedMission')
            })
            .catch(err => this.props.handleAlert(err.response.data.message))
    }


    render() {

        return (
            <Container>
                <h1>MISSION_DIRECTIVE_: {this.state.directive}</h1>
                <Form onSubmit={e => this.handleSubmit(e)}>
                    <Row>
                        <Col md={6}>
                            <Form.Group controlId="title">
                                <Form.Label>TITLE:</Form.Label>
                                <Form.Control type="text" value={this.state.title} onChange={e => this.handleInputChange(e)} name="title" />
                            </Form.Group>
                            <hr />
                            {
                                this.state.parallelCitizenPlanBlock ?
                                    <>
                                        <h3>{this.state.targetName.toUpperCase()}'S PARALLEL CITIZEN PLAN BLOCK:</h3>
                                        <h1>{this.state.parallelCitizenPlanBlockTitle}</h1>
                                        <Button variant="danger" onClick={() => this.cancelParallelCitizenPlanBlock()}>X</Button>
                                    </>
                                :
                                    <>
                                        {
                                            !this.state.citizenPlanBlocks ?
                                                <h1>LOADING ALL OF TARGET'S PLANBLOCKS</h1>
                                            :
                                            <DropdownButton title={`${this.state.targetName}'s PlanBlocks`} id="citizenPlanBlocks-dropdown" >
                                                {this.state.citizenPlanBlocks.map(elm =>
                                                    <Dropdown.Item
                                                        key={elm._id}
                                                        name="citizenPlanBlock"
                                                        value={elm._id}
                                                        onSelect={() => this.addParallelCitizenPlanBlock(elm._id)}
                                                    >
                                                        {elm.title}
                                                    </Dropdown.Item>
                                                )}
                                            </DropdownButton>
                                        }
                                    </>
                            }
                            <hr />
                            <Form.Group controlId="description">
                                <Form.Label>DESCRIPTION:</Form.Label>
                                <Form.Control type="textarea" value={this.state.description} onChange={e => this.handleInputChange(e)} name="description" />
                            </Form.Group>
                            <hr />
                        </Col>
                        <Col md={6}>
                            <h1>'GOOGLE MAPS MAP'</h1>
                            <hr/>
                            <Form.Group controlId="locationName">
                                <Form.Label>LOCATION NAME:</Form.Label>
                                <Form.Control type="text" value={this.state.locationName} onChange={e => this.handleInputChange(e)} name="locationName" />
                            </Form.Group>
                            <hr/>
                        </Col>
                    </Row>

                    <Button variant="primary" style={{ width: '100%', marginTop: '20px' }} type="submit"> CREATE MISSION PLANBLOCK </Button>
                    <Button variant="dark">
                        <Link to="/assignedMission" className="nav-link">CANCEL & GO BACK</Link>
                    </Button>
                </Form>
            </Container>
        )
    }
}

export default NewMissionPlanBlockForm