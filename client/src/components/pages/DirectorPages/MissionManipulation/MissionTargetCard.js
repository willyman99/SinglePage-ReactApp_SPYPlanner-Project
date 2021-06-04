import './../Director.css'
import { Card } from 'react-bootstrap'

const MissionTargetCard = ({ target, objective }) => {

    return (
        <Card className="missionTarget-card">
            <Card.Body>
                <Card.Title>'PROFILE PICTURE'</Card.Title>
                <Card.Title>{target.name}</Card.Title>
                <Card.Text>(ALIAS-{target.username})</Card.Text>
                <Card.Text>POPULARITY: {target.friends.length}</Card.Text>
                <Card.Title>OBJECTIVE: {objective} </Card.Title>
            </Card.Body>
        </Card>
    )
}

export default MissionTargetCard