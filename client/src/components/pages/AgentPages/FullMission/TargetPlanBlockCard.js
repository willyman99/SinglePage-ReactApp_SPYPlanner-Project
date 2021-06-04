import './../Agent.css'

import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const TargetPlanBlockCard = ({ planBlock, missionStatus }) => {

    return (
        <>
            <Card className="targetPlanBlock-card">
                <Card.Header>
                    <Card.Title>TITLE: {planBlock.title}</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Card.Text>DESCRIPTION: {planBlock.description}</Card.Text>
                    <Card.Text>LOCATION: ____</Card.Text>
                    <Card.Text>DATE: ____</Card.Text>
                    <Card.Text>TIME: ____</Card.Text>
                    <Card.Text>
                        PARTICIPANTS:
                        <ul>
                            {
                                planBlock.participants.map(elm => <li key={elm._id}>{elm.name}</li>)
                            }
                        </ul>
                    </Card.Text>
                </Card.Body>
                {
                    missionStatus !== 'approved' ?
                        <Card.Header>
                            <Button variant="dark">
                                <Link to={`/missionPlanBlock/createForm?parallelTo=${planBlock._id}`} className="nav-link">MAKE A PARALLEL MISSION PLANBLOCK TO '{planBlock.title.toUpperCase()}'</Link>
                            </Button>
                        </Card.Header>
                        :
                        null
                }
            </Card>
            <hr />
        </>    
    )
}

export default TargetPlanBlockCard