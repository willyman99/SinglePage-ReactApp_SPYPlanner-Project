import './Planner.css'
import { Card, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'


const ListedPlanBlock = ({ description, title, _id }) => {

    return (
        <Col md={3}>
            <Card className="planBlock-card">
                <Card.Body>
                    <Card.Header>DATE</Card.Header>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>{description}</Card.Text>
                    <Button variant="dark">
                        <Link to={`/planner/${_id}`} className="nav-link">MORE INFO</Link>
                    </Button>
                    <Card.Footer>TIMESLOT</Card.Footer>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default ListedPlanBlock