import './Planner.css'
import { Component } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import PlannerService from '../../../../service/planner.service'

class FullPlanBlock extends Component {

    constructor() {
        super()
        this.state = {
            planBlock: undefined
        }
        this.plannerService = new PlannerService()
    }

    componentDidMount() {

        const { planBlockId } = this.props.match.params

        this.plannerService
            .getOnePlanBlock(planBlockId)
            .then(response => {
                this.setState({ planBlock: response.data })
            })
            .catch(err => this.props.handleAlert(err.response.data.message))

    }

    deleteThisPlanBlock() {

        const { planBlockId } = this.props.match.params

        this.plannerService
            .deleteOnePlanBlock(planBlockId)
            .then(response => {
                this.props.handleAlert(response.data.message)
                this.props.history.push('/planner')
            })
            .catch(err => this.props.handleAlert(err.response.data.message))
    }

    render() {

        const { planBlock } = this.state
        const participantsToShow = planBlock ? planBlock.participants.filter(elm => elm._id !== this.props.loggedUser._id) : undefined

        return (

            <Container>
                {
                    !planBlock ?
                        <h1>LOADING PLANBLOCK</h1>
                    :
                        <>
                            <Row className="justify-content-between">
                                <Col md={6}>
                                    <h1>DATE</h1>
                                    <hr/>
                                    <h1>{planBlock.title}</h1>
                                    <hr/>
                                    <p>{planBlock.description}</p>
                                </Col>

                                <Col md={6}>
                                    <h1>'MAP WITH LOCATION MARKER'</h1>
                                    <hr/>
                                    <h1>'LOCATION NAME'</h1>
                                </Col>
                            </Row>
                            <hr />
                            <h1>Participants:</h1>
                            <ul>
                                <li key={this.props.loggedUser._id} >YOU ({this.props.loggedUser.name})</li>
                                {
                                    !participantsToShow ?
                                        <h1>LOADING OTHER PARTICIPANTS</h1>
                                    :
                                        participantsToShow.map(elm => <li key={elm._id} >{elm.name}</li>)
                                    
                                }
                            </ul>
                            <hr/>
                            <Row className="justify-content-between">
                                <Col md={6}>
                                    <h1>TIMESLOT</h1>
                                </Col>

                                <Col md={6}>
                                    <Button variant="danger" onClick={() => this.deleteThisPlanBlock()}> DELETE PLANBLOCK </Button>
                                </Col>
                            </Row>
                            <Button variant="dark">
                                <Link to="/planner" className="nav-link">GO BACK</Link>
                            </Button>
                        </>
                }
            </Container>
        )
    }
}

export default FullPlanBlock