import axios from 'axios'


class AgentManipulationService {

    constructor() {
        this.app = axios.create({
            baseURL: 'http://localhost:5000/agents',
            withCredentials: true
        })
    }

    createAgent = agentInfo => this.app.post('/create', agentInfo)
    getAllAgents = () => this.app.get('/')
    getOneAgent = agentId => this.app.get(`/${agentId}`)
    awardOneAgent = agentId => this.app.put(`/award/${agentId}`)
    deleteOneAgent = agentId => this.app.delete(`/${agentId}`) 
}


export default AgentManipulationService