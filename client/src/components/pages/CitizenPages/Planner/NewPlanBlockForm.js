import './Planner.css'
import { Component } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import PlannerService from './../../../../service/planner.service'
import UserService from './../../../../service/user.service'

class NewPlanBlockForm extends Component {

    constructor() {
        super()
        this.state = {
            title: '',
            description: '',
            participants: [],
            friends: []
        }
        this.plannerService = new PlannerService()
        this.userService = new UserService()
    }

    componentDidMount() {

        const joinedArrays = this.state.participants.concat({id: this.props.loggedUser._id, name: this.props.loggedUser.name})
        this.setState({ participants: joinedArrays })
        
        const query = this.props.location.search
        if (query.includes('with')) { this.extractParticipant(query) }
        //if (query.includes('time')) { this.extractTime(query) }

        this.loadFriends()
    }

    extractParticipant(string) {
        const participantId = string.replace('?with=', '')
        this.addParticipant(participantId)
    }

    // extractTime(string) {
    //     const time = string.replace('?time=', '')
    // }

    loadFriends() {
        this.userService
            .profile()
            .then(response => {
                this.setState({ friends: response.data.friends })
            })
            .catch(err => this.props.handleAlert(err.response.data.message))
    }

    addParticipant(participantId) {
        this.userService
            .getOneUser(participantId)
            .then(response => {
                const joinedArrays = this.state.participants.concat({id: participantId, name: response.data.name})
                this.setState({ participants: joinedArrays })
            })
            .catch(err => this.props.handleAlert(err.response.data.message))
    }

    removeParticipant(participantId) {
        const filteredArray = this.state.participants.filter(elm => elm.id !== participantId)
        this.setState({ participants: filteredArray })

    }

    handleInputChange(e) {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }


    handleSubmit(e) {
        e.preventDefault()

        const { title, description } = this.state
        const participants = this.state.participants.map(elm => elm.id)

        this.plannerService
            .addBlock({title, description, participants})
            .then(response => {
                this.props.handleAlert(response.data.message)
                this.props.history.push('/planner')
            })
            .catch(err => this.props.handleAlert(err.response.data.message))
    }


    render() {

        const participantsToShow = this.state.participants.filter(elm => elm.id !== this.props.loggedUser._id)
        const participantsIds = participantsToShow.map(elm => elm.id)

        const friendsToShow = this.state.friends.filter(elm => !participantsIds.includes(elm._id))

        return (

            <Container>
                <Form onSubmit={e => this.handleSubmit(e)}>
                    <Row>
                        <Col md={6}>
                            <Form.Group controlId="title">
                                <Form.Label>Plan Title</Form.Label>
                                <Form.Control type="text" value={this.state.title} onChange={e => this.handleInputChange(e)} name="title" />
                            </Form.Group>
                            <hr/>
                            <Form.Group controlId="description">
                                <Form.Label>Plan Description</Form.Label>
                                <Form.Control type="textarea" value={this.state.description} onChange={e => this.handleInputChange(e)} name="description" />
                            </Form.Group>
                            <hr/>
                        </Col>
                        <Col md={6}>
                            <h1>'GOOGLE MAPS CHOOSE LOCATION INPUT'</h1>
                            <hr/>
                            <h1>'LOCATION NAME INPUT'</h1>
                            <hr/>
                        </Col>
                    </Row>

                    <h3>ADD FRIENDS</h3>
                    {
                        !friendsToShow ?
                            <h4>LOADING FRIENDS</h4>
                        :
                            <>
                                {friendsToShow.map(elm => <Button key={`friend-${elm._id}`} onClick={() => this.addParticipant(elm._id)}>{elm.name} +</Button>)}
                            </>
                    }
                    <hr/>

                    <h3>PARTICIPANTS</h3>
                    {
                        !participantsToShow ?
                            <h4>LOADING PARTICIPANTS</h4>
                        :
                            <>
                                {participantsToShow.map(elm => <Button key={`participant-${elm.id}`} variant="success" onClick={() => this.removeParticipant(elm.id)}>{elm.name} x</Button>)}
                            </>
                    }
                    <hr/>
                    
                    <Row>
                        <Col md={6}>
                            <h1>'DATE INPUT'</h1>
                        </Col>
                        <Col md={6}>
                            <h1>'TIME INPUT'</h1>
                        </Col>
                    </Row>

                    <Button variant="dark" style={{ width: '100%', marginTop: '20px' }} type="submit"> CREATE NEW PLANBLOCK </Button>
                    <Button variant="dark">
                        <Link to="/planner" className="nav-link">CANCEL & GO BACK</Link>
                    </Button>
                </Form>
            </Container>
        )
    }
}

export default NewPlanBlockForm