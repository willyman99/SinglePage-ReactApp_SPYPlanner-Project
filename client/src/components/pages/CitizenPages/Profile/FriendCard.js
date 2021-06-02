import './Profile.css'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'


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
            .catch(err => this.props.handleAlert(err.response.data.message))
    }


    return (
        <Card className="friend-card">
            <Card.Body>
                <Card.Title>{name} aka {username}</Card.Title>
                <Button variant="danger" onClick={() => removeFriend()}>X</Button>
                <Button variant="dark">
                    <Link to={`/planner/createForm?with=${_id}`} className="nav-link">MAKE PLAN WITH {name} </Link>
                </Button>
            </Card.Body>
        </Card>
    )
}

export default FriendCard