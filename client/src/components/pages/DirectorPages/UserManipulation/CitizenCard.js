import './../Director.css'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'


const CitizenCard = ({ username, name, _id, friends, deleteCitizen }) => {

    return (
        <Card className="citizen-card">
            <Card.Body>
                <Card.Title>'PROFILE PIC'</Card.Title>
                <Card.Title>{name}</Card.Title>
                <Card.Title>ALIAS: {username}</Card.Title>
                <Card.Text>POPULARITY: {friends.length}</Card.Text>
                <Card.Text>MOST RECENT LOCATION:__</Card.Text>

                <Button variant="dark">
                    <Link to={`/mission/createForm?target=${_id}`} className="nav-link"> TARGET </Link>
                </Button>
                <Button variant="danger" onClick={() => deleteCitizen()}>DELETE CITIZEN</Button>

            </Card.Body>
        </Card>
    )
}

export default CitizenCard