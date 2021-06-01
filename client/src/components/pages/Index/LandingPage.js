import { Component } from 'react'
import { Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'



class LandingPage extends Component {

    constructor() {
        super()
        this.state = {
            showModal: false
        }
    }

    render() {
        return (
            <Container>
                <h1>S.P.Y. Planner 'CUTE LOGO'</h1>
                <h2>S.P.Y. Planner</h2>
                <Button variant="dark">
                    <Link to="/signup" className="nav-link">SignUp</Link>
                </Button>
                <Button variant="dark">
                    <Link to="/login" className="nav-link">Login</Link>
                </Button>

            </Container>
        )
    }
}

export default LandingPage