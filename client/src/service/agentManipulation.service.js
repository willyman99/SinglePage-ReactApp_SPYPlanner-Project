import axios from 'axios'


class AgentManipulationService {

    constructor() {
        this.app = axios.create({
            baseURL: 'http://localhost:5000/agents',
            withCredentials: true
        })
    }

    createAgent = agentInfo => this.app.post('/create', agentInfo) //The created User (agent)
    getAllAgents = () => this.app.get('/') //All users with the 'role' attribute: 'agent'
    getOneAgent = agentId => this.app.get(`/${agentId}`) //The Agent
    deleteOneAgent = agentId => this.app.delete(`/${agentId}`) //msg: 'Agent deleted successfully'

}


export default AgentManipulationService