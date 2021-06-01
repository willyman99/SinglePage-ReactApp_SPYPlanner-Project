import './Profile.css'
import { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import UserService from './../../../../service/user.service'

import FriendCard from './FriendCard'
import UserCard from './UserCard'


class Friends extends Component {

    constructor() {
        super()
        this.state = {
            friends: undefined,
            allUsers: undefined,
            searchValue: ''
        }
        this.userService = new UserService()
    }


    componentDidMount() {
        this.loadCommunity()
    }

    loadCommunity() {
        this.loadFriends()
        this.loadAllUsers()
    }

    loadFriends() {
        this.userService
            .profile()
            .then(response => {
                this.setState({ friends: response.data.friends })
            })
            //.catch
    }

    loadAllUsers() {
        this.userService
            .getAllUsers()
            .then(response => this.setState({ allUsers: response.data }))
            //.catch
    }


    handleSearchInputChange = e => {
        const value = e.target.value
        this.searchFor(value)
    }


    searchFor(value) {
        this.setState({ searchValue: value })
    }


    render() {

        const { friends, allUsers } = this.state
        const friendIds = friends ? friends.map(elm => elm._id) : []
        let usersToShow = allUsers ? allUsers.filter(elm => elm.username.includes(this.state.searchValue) && !friendIds.includes(elm._id)) : undefined

        return (

            <Container>
                <Row>
                    <Col md={6}>
                        <h2>Your Friends:</h2>
                        <hr/>
                        {
                            !friends ?
                                <h1>LOADING FRIENDS</h1>
                            :
                                <>
                                    {
                                        friends.map(elm =>
                                            <FriendCard
                                                key={elm._id}
                                                {...elm} loggedUser={this.props.loggedUser}
                                                handleAlert={this.props.handleAlert}
                                                storeUser={this.props.storeUser}
                                                reload={() => this.loadCommunity()}
                                                
                                            />
                                        )
                                    }
                                </>
                        }
                    </Col>

                    <Col md={6}>
                        <h2>Community Search:</h2>
                        <hr/>
                        {
                            !allUsers ?
                                <h1>LOADING COMMUNITY</h1>
                            :
                                <>
                                    <label htmlFor="searchBox" >Search by username</label>
                                    <input type="text" id="searchbox" onChange={e => this.handleSearchInputChange(e)} />    
                                    <hr/>
                                    {
                                        usersToShow.map(elm =>
                                            <UserCard
                                                key={elm._id}
                                                {...elm}
                                                loggedUser={this.props.loggedUser}
                                                handleAlert={this.props.handleAlert}
                                                storeUser={this.props.storeUser}
                                                reload={() => this.loadCommunity()}
                                            />
                                        )
                                    }
                                </>
                        }
                    </Col>

                </Row>
            </Container>

        )
    }
}

export default Friends