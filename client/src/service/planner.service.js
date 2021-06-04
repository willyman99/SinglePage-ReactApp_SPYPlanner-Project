import axios from 'axios'


class PlannerService {

    constructor() {
        this.app = axios.create({
            baseURL: 'http://localhost:5000/planner',
            withCredentials: true
        })
    }

    addBlock = ({ title, description, participants }) => this.app.post('/addBlock', { title, description, participants })
    getUserPlanBlocks = () => this.app.get('/')
    getSomeUserPlanBlocks = userId => this.app.get(`/allPlanBlocks/${userId}`) 
    getOnePlanBlock = planBlockId => this.app.get(`/planBlock/${planBlockId}`)
    editOnePlanBlock = ({ planBlockId, title, description, participants }) => this.app.put(`/${planBlockId}`, { title, description, participants })
    deleteOnePlanBlock = planBlockId => this.app.delete(`/${planBlockId}`)
}


export default PlannerService