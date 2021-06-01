import './Planner.css'

import { Container, Button } from 'react-bootstrap'

import { Link } from 'react-router-dom'

import PlansList from './PlansList'


const Planner = () => {
    return (
        <Container>
            <h1>S.P.Y. Planner 'CUTE LOGO'</h1>

            <Button variant="dark">
                <Link to="/profile/friends" className="nav-link">FRIENDS</Link>
            </Button>

            <PlansList/>
            
            <Button variant="dark">
                <Link to="/planner/createForm" className="nav-link">NEW PLAN</Link>
            </Button>

        </Container>
    )
}

export default Planner
