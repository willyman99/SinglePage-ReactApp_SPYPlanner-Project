import axios from 'axios'


class PlannerService {

    constructor() {
        this.app = axios.create({
            baseURL: 'http://localhost:5000/planner',
            withCredentials: true
        })
    }

    addBlock = (title, description, participants) => this.app.post('/addBlock', { title, description, participants }) //Created PlanBlock.json
    getUserPlanBlocks = () => this.app.get('/') //All of Current User's PlanBlocks
    getOnePlanBlock = planBlockId => this.app.get(`/${planBlockId}`) //The PlanBlock
    editOnePlanBlock = (planBlockId, title, description, participants) => this.app.put(`/${planBlockId}`, { title, description, participants }) //The updated PlanBlock
    deleteOnePlanBlock = planBlockId => this.app.delete(`/${planBlockId}`) //msg: 'PlanBlock deleted successfully'
}


export default PlannerService