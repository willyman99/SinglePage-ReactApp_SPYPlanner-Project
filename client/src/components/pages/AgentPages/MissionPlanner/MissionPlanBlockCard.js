import './../Agent.css'

import { Card, Button } from 'react-bootstrap'

const MissionPlanBlockCard = ({ missionPlanBlock, deleteMissionPlanBlock, missionStatus, isDirector=false }) => {

    const { parallelCitizenPlanBlock } = missionPlanBlock
    const missionPlanBlockId = missionPlanBlock._id

    return (
        <>
            <Card className="missionPlanBlock-card">
                <Card.Header>
                    <Card.Title>MISSION PLANBLOCK:{missionPlanBlock.title}</Card.Title>
                    <Card.Text>METHOD: {missionPlanBlock.description}</Card.Text>
                    <Card.Text>LOCATION: {missionPlanBlock.locationName}</Card.Text>
                </Card.Header>
                <Card.Body>
                    <Card.Text>PARALLEL TO CITIZEN PLANBLOCK:<Card.Title>{parallelCitizenPlanBlock.title}</Card.Title></Card.Text>
                    <Card.Text>DESCRIPTION: {missionPlanBlock.description}</Card.Text>
                    <Card.Text>LOCATION: {missionPlanBlock.locationName}</Card.Text>
                    <Card.Text>DATE: ____</Card.Text>
                    <Card.Text>TIME: ____</Card.Text>
                    <Card.Text>
                        OTHER NEARBY CITIZENS:
                        <ul>
                            {
                                parallelCitizenPlanBlock.participants.map(elm => <li key={elm._id}>{elm.name}</li>)
                            }
                        </ul>
                    </Card.Text>
                </Card.Body>
                {
                    !isDirector ?
                        <>
                        {missionStatus !== 'approved' ?
                            <Card.Header>
                                <Button variant="danger" onClick={() => deleteMissionPlanBlock(missionPlanBlockId)}>X</Button>
                            </Card.Header>
                            :
                            null
                        }
                        </>
                        :
                        null
                }
            </Card>
            <hr />
        </>    
    )
}

export default MissionPlanBlockCard