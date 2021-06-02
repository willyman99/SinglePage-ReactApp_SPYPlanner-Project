import './../Director.css'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'


const AgentCard = ({ username, _id, medals, assignedMission, deleteAgent }) => {

    return (
        <Card className="citizen-card">
            <Card.Body>
                <Card.Title>'PROFILE PIC'</Card.Title>
                <Card.Title>AGENT-{username}</Card.Title>
                <Card.Text>MEDALS: {medals}</Card.Text>
                <Card.Text>ASSIGNED MISSION: {assignedMission ? assignedMission.codename : 'NOT YET ASSIGNED'}</Card.Text>
                {
                    assignedMission ?
                        <>
                            <Card.Text>STATUS: {assignedMission.status}</Card.Text>
                            <Button variant="warning">
                                <Link to={`/mission/${assignedMission._id}`} className="nav-link"> REVIEW MISSION </Link>
                            </Button>
                        </>
                    :
                        <Button variant="dark">
                            <Link to={`/mission/createForm?agent=${_id}`} className="nav-link"> ASSIGN MISSION </Link>
                        </Button>  
                }
                <Button variant="danger" onClick={() => deleteAgent()}>TERMINATE AGENT</Button>
            </Card.Body>
        </Card>
    )
}

export default AgentCard