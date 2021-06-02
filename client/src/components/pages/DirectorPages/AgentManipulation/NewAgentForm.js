import './../Director.css'
import { Component } from 'react'
import { Form, Button } from 'react-bootstrap'

import AgentManipulationService from './../../../../service/agentManipulation.service'
import AuthService from './../../../../service/auth.service'


class NewPlanBlockForm extends Component {

    constructor() {
        super()
        this.state = {
            username: '',
            pwd: ''
        }
        this.authService = new AuthService()
        this.agentManipulationService = new AgentManipulationService()
    }

    handleInputChange(e) {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }


    handleSubmit(e) {
        e.preventDefault()

        const { username, pwd } = this.state
        username.toUpperCase()

        this.agentManipulationService
            .createAgent({ username, pwd })
            .then(response => {
                this.props.handleAlert(response.data.message)
                this.props.history.push('/directorLandingPage')
            })
            .catch(err => this.props.handleAlert(err.response.data.message))
    }


    render() {
        return (

            <Form onSubmit={e => this.handleSubmit(e)}>

                <Form.Group controlId="username">
                    <Form.Label>AGENT codename</Form.Label>
                    <Form.Control type="text" value={this.state.username} onChange={e => this.handleInputChange(e)} name="username" />
                </Form.Group>
                <hr/>

                <Form.Group controlId="password">
                    <Form.Label>AGENT codeword</Form.Label>
                    <Form.Control type="password" value={this.state.pwd} onChange={e => this.handleInputChange(e)} name="pwd" />
                </Form.Group>
                <hr/>

                <h1>CHOOSE A PROFILE PICTURE:</h1>
                <hr/>

                <Button variant="dark" style={{ width: '100%', marginTop: '20px' }} type="submit">CREATE AGENT</Button>
            </Form>
        )
    }
}

export default NewPlanBlockForm