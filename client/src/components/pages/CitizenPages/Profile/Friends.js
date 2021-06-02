import './Profile.css'
import { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import UserService from './../../../../service/user.service'

import FriendCard from './FriendCard'
import UserCommunityCard from './UserCommunityCard'


class Friends extends Component {

    constructor() {
        super()
        this.state = {
            friends: undefined,
            allUsers: undefined,
            searchValue: undefined
        }
        this.userService = new UserService()
    }


    componentDidMount() {
        this.loadCommunity()
        if(this.props.loggedUser.role === 'director') this.setState({searchValue: ''})
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
            .catch(err => this.props.handleAlert(err.response.data.message))
    }

    loadAllUsers() {
        this.userService
            .getAllUsers()
            .then(response => this.setState({ allUsers: response.data }))
            .catch(err => this.props.handleAlert(err.response.data.message))
    }


    handleSearchInputChange = e => {
        const value = e.target.value
        this.searchFor(value)
    }


    searchFor(value) {
        if(value === '' && this.props.loggedUser.role !== 'director') { value = undefined }
        this.setState({ searchValue: value })
    }


    render() {

        const { friends, allUsers } = this.state
        let friendIds = friends ? friends.map(elm => elm._id) : []
        let usersToShow = allUsers ? allUsers.filter(elm => elm.username.includes(this.state.searchValue) && !friendIds.includes(elm._id)) : undefined

        return (

            <Container>
                <Row>
                    <Col md={7}>
                        <h2>Your Friends:</h2>
                        <hr/>
                        {
                            !friends ?
                                <h1>LOADING FRIENDS</h1>
                            :
                                <>
                                {friends.map(elm =>
                                    <FriendCard
                                        key={elm._id}
                                        {...elm}
                                        handleAlert={this.props.handleAlert}
                                        storeUser={this.props.storeUser}
                                        reload={() => this.loadCommunity()} 
                                    />
                                )}
                                </>
                        }
                    </Col>

                    <Col md={5}>
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
                                            <UserCommunityCard
                                                key={elm._id}
                                                {...elm}
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