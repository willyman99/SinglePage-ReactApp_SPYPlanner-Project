import { Component } from 'react'
import './../Director.css'
import AgentManipulationService from '../../../../service/agentManipulation.service'
import AgentCard from './AgentCard'

class AgentsList extends Component{

    constructor() {
        super()
        this.state = {
            allAgents: undefined,
            searchValue: ''
        }
        this.agentManipulationService = new AgentManipulationService()
    }

    componentDidMount() {
        this.loadAllAgents()
    }

    loadAllAgents() {
        this.agentManipulationService
            .getAllAgents()
            .then(response => this.setState({ allAgents: response.data }) )
            .catch(err => this.props.handleAlert(err.response.data.message))
    }

    handleSearchInputChange = e => {
        const value = e.target.value
        this.searchFor(value)
    }

    searchFor(value) {
        this.setState({ searchValue: value })
    }

    deleteAgent(agentId) {
        this.agentManipulationService
            .deleteOneAgent(agentId)
            .then(response => {
                this.props.handleAlert(response.data.message)
                this.loadAllAgents()
            })
        .catch(err => this.props.handleAlert(err.response.data.message))
    }

    render() {
        const { allAgents } = this.state
        let agentsToShow = allAgents ? allAgents.filter(elm => elm.username.includes(this.state.searchValue)) : undefined
        agentsToShow = allAgents ? agentsToShow.reverse().sort((a, b) => (a.medals < b.medals) ? 1 : -1) : undefined
        return (
            <>
                <h1>AGENTS:</h1>
                <hr/>
                {
                    !allAgents ?
                        <h1>LOADING ALL AGENTS</h1>
                    :
                        <>
                            <label htmlFor="searchBox" >Search Agents</label>
                            <input type="text" id="agent-searchbox" onChange={e => this.handleSearchInputChange(e)} />    
                            <hr/>
                            {
                                agentsToShow.map(elm => <AgentCard key={elm._id} {...elm} deleteAgent={() => this.deleteAgent(elm._id)}/>)
                            }
                        </>
                }
            </>
        )
    }
}

export default AgentsList