import './Profile.css'
import { Card, Button } from 'react-bootstrap'

import UserService from './../../../../service/user.service'


const FriendCard = ({ name, username, _id, handleAlert, storeUser, reload }) => {

    const removeFriend = () => {
        const userService = new UserService()

        userService
            .removeFriend(_id)
            .then(response => {
                handleAlert(`Removed ${username} from friends.`)
                storeUser(response.data)
                reload()
            })
            //.catch
    }


    return (
        <Card className="friend-card">
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Button variant="dark" onClick={() => removeFriend()}>X</Button>

                <Button variant="dark" to="/planner/CreateForm" className="nav-link">MAKE PLAN WITH {username} </Button> {/* take the selected friend to premake a plan */}
            </Card.Body>
        </Card>
    )
}

export default FriendCard