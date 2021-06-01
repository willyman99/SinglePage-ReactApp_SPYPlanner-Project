import './Profile.css'
import { Component } from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import UserService from './../../../../service/user.service'
import AuthService from './../../../../service/auth.service'

class Profile extends Component {

    constructor() {
        super()
        this.state = {
            name: '',
            editName: false
        }
        this.userService = new UserService()
        this.authService = new AuthService()
    }


    nameElementToggle() {
        this.setState({ editName: !this.state.editName, name: this.props.loggedUser.name })
    }


    handleInputChange(e) {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }


    handleSubmit(e) {
        e.preventDefault()

        this.userService
            .changeName(this.state.name)
            .then(response => {
                this.props.handleAlert('Name Changed Succesfully.')
                this.props.storeUser(response.data)
                this.nameElementToggle()
            })
            .catch(err => {
                const errorMessage = err.response.data.message
                this.props.handleAlert(errorMessage)
            })
    }


    render() {

        const { loggedUser, logout } = this.props

        return (
            <Container>
                <h1>{loggedUser.username}'s Profile</h1>
                <hr/>
                <Row>
                    <Col md={6}>
                        {
                            this.state.editName ?
                                <Form onSubmit={e => this.handleSubmit(e)}>
                                    <Form.Group controlId="name">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" value={this.state.name} onChange={e => this.handleInputChange(e)} name="name" />
                                    </Form.Group>
                                    <Button variant="dark" type='submit'>Set new name</Button>
                                </Form>
                            :
                                <>
                                    <h3>Name: {loggedUser.name} </h3>
                                    <Button variant="dark" onClick={() => this.nameElementToggle()}>Edit name</Button>
                                </>
                        }
                        <hr/>

                        <span>{loggedUser.friends.length}</span>
                        <Button variant="dark">
                            <Link to="/profile/friends" className="nav-link">FRIENDS</Link>
                        </Button>
                        <hr/>


                        <span>{loggedUser.plans.length}</span>
                        <Button variant="dark">
                            <Link to="/planner" className="nav-link">PLANS</Link>
                        </Button>
                        <hr/>
                        
                    </Col>

                    <Col md={6}>
                        <img src="../../../../../public/img/citizen/profPic-default.jpg" alt={loggedUser.username}></img>
                        <Button variant="dark">Change Profile Picture</Button>
                    </Col>
                </Row>
                <Button variant="dark" onClick={() => logout()}>
                    <Link to="/" className="nav-link">LOGOUT</Link>
                </Button>
            </Container>
        )
    }
}

export default Profile