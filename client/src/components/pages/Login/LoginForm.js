import { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import AuthService from './../../../service/auth.service'

class LoginForm extends Component {

    constructor() {
        super()
        this.state = {
            username: '',
            pwd: ''
        }
        this.authService = new AuthService()
    }


    handleInputChange(e) {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }


    handleSubmit(e) {
        e.preventDefault()

        this.authService
            .login(this.state)
            .then(response => {
                this.props.storeUser(response.data)
                switch (response.data.role) {
                    case 'citizen':
                        this.props.handleAlert(`${response.data.username} has logged in.`)
                        this.props.history.push('/planner')
                        break
                    case 'director':
                        this.props.handleAlert(`Greetings Director ${response.data.name}.`)
                        this.props.history.push('/directorLandingPage')
                        break
                    case 'agent':
                        this.props.handleAlert(`Agent ${response.data.username} login.`)
                        this.props.history.push('/agentLandingPage')
                        break
                    default:
                        this.props.history.push('/')
                        break
                }
            })
            .catch(err => this.props.handleAlert(err.response.data.message) )
    }

    render() {
        return (

            <Form onSubmit={e => this.handleSubmit(e)}>

                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" value={this.state.username} onChange={e => this.handleInputChange(e)} name="username" />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={this.state.pwd} onChange={e => this.handleInputChange(e)} name="pwd" />
                </Form.Group>

                <Button variant="dark" style={{ width: '100%', marginTop: '20px' }} type="submit">Login</Button>
            </Form>
        )
    }
}

export default LoginForm