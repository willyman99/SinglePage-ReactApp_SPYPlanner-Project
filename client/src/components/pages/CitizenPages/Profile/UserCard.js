import './Profile.css'
import { Card, Button } from 'react-bootstrap'

import UserService from './../../../../service/user.service'


const UserCard = ({ username, _id, handleAlert, storeUser, reload }) => {

    const addFriend = () => {
        const userService = new UserService()

        userService
            .addFriend(_id)
            .then(response => {
                handleAlert(`Added ${username} to friends.`)
                storeUser(response.data)
                reload()
            })
            //.catch
    }


    return (
        <Card className="user-card">
            <Card.Body>
                <Card.Title>{username}</Card.Title>
                <Button variant="dark" onClick={() => addFriend()}>O</Button>
            </Card.Body>
        </Card>
    )
}

export default UserCard