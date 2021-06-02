import { Component } from 'react'
import './../Director.css'
import UserService from '../../../../service/user.service'
import CitizenCard from './CitizenCard'

class CitizensList extends Component{

    constructor() {
        super()
        this.state = {
            allCitizens: undefined,
            searchValue: ''
        }
        this.userService = new UserService()
    }

    componentDidMount() {
        this.loadAllCitizens()
    }

    loadAllCitizens() {
        this.userService
            .getAllUsers()
            .then(response => this.setState({ allCitizens: response.data }))
            .catch(err => this.props.handleAlert(err.response.data.message))
    }

    handleSearchInputChange = e => {
        const value = e.target.value
        this.searchFor(value)
    }

    searchFor(value) {
        this.setState({ searchValue: value })
    }

    deleteCitizen(citizenId) {
        this.userService
            .deleteOneUser(citizenId)
            .then(response => {
                this.props.handleAlert(response.data.message)
                this.loadAllCitizens()
            })
            .catch(err => this.props.handleAlert(err.response.data.message))
    }

    render() {
        const { allCitizens } = this.state
        let citizensToShow = allCitizens ? allCitizens.filter(elm => elm.username.includes(this.state.searchValue) || elm.name.includes(this.state.searchValue)) : undefined
        citizensToShow = allCitizens ? citizensToShow.sort((a, b) => (a.friends.length < b.friends.length) ? 1 : -1) : undefined

        return (
            <>
                <h1>CITIZENS:</h1>
                <hr/>
                {
                    !allCitizens ?
                        <h1>LOADING ALL CITIZENS</h1>
                    :
                        <>
                            <label htmlFor="searchBox" >Search Citizens by name or username</label>
                            <input type="text" id="citizen-searchbox" onChange={e => this.handleSearchInputChange(e)} />    
                            <hr/>
                            {
                                citizensToShow.map(elm => <CitizenCard key={elm._id} {...elm} deleteCitizen={() => this.deleteCitizen(elm._id)} /> )
                            }
                        </>
                }
            </>
        )
    }
}

export default CitizensList