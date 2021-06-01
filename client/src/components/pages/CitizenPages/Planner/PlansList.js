import './Planner.css'

import { Container } from 'react-bootstrap'

import ListedPlanBlock from './ListedPlanBlock'


const PlansList = () => {
    return (
        <Container>
            <h3>All Plans:</h3>

            <ListedPlanBlock/>
            <ListedPlanBlock/>

        </Container>
    )
}

export default PlansList