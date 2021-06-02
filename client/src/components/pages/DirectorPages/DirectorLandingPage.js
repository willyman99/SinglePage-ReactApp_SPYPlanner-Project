import './Director.css'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import CitizensList from './UserManipulation/CitizensList'
import AgentsList from './AgentManipulation/AgentsList'


const DirectorLandingPage = ({handleAlert}) => {
    return(
        <Container>
            <Row>
                <Col md={6}>
                    <h1>'CUTE LOGO'</h1>
                    <Button variant="info">
                        <Link to="/planner" className="nav-link">PLANNER</Link>
                    </Button>
                    <hr />
                    <CitizensList handleAlert={handleAlert}/>
                </Col>
                <Col md={6}>
                    <h1>'AGENCY LOGO'</h1>
                    <Button variant="dark">
                        <Link to="/mission/createForm" className="nav-link">NEW MISSION</Link>
                    </Button>
                    <Button variant="dark">
                        <Link to="/agents/createForm" className="nav-link">NEW AGENT</Link>
                    </Button>
                    <hr />
                    <AgentsList handleAlert={handleAlert}/>
                </Col>
            </Row>
        </Container>
    )
}

export default DirectorLandingPage