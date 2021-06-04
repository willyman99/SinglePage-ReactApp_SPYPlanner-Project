import './../Director.css'
import { Card } from 'react-bootstrap'

const MissionAgentCard = ({agent}) => {

    return (
        <Card className="missionAgent-card">
            <Card.Body>
                <Card.Title>'PROFILE PICTURE'</Card.Title>
                <Card.Title>{agent.username}</Card.Title>
                <Card.Text>MEDALS: {agent.medals}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default MissionAgentCard