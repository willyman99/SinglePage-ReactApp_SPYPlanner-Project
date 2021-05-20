import axios from 'axios'


class MissionService {

    constructor() {
        this.app = axios.create({
            baseURL: 'http://localhost:5000/mission',
            withCredentials: true
        })
    }

    assignMission = mission => this.app.post('/assign', mission) //DIRECTOR ONLY: The created mission (and saves it in the assigned agent)
    getOneMission = missionId => this.app.get(`/${missionId}`) //DIRECTOR ONLY: The mission
    updateOneMissionStatus = (missionId, status) => this.app.put(`/${missionId}?status=${status}`) //DIRECTOR ONLY: The updated mission
    deleteOneMission = missionId => this.app.delete(`/${missionId}`) //DIRECTOR ONLY: msg: 'Mission deleted successfully'
    
    getAssignedMission = () => this.app.get('/') //AGENTS ONLY: The Current User's (agent) full assigned Mission

    addMissionBlock = (title, description, parallelCitizenPlanBlock) => this.app.post('/plan/addBlock', { title, description, parallelCitizenPlanBlock }) //AGENTS ONLY: The created MissionPlanBlock (and saves it in the corresponding mission)
    getAssignedMissionPlan = () => this.app.get('/plan') //AGENTS & ONLY: All the MissionPlanBlocks from the Current User's assigned Mission
    getOneMissionPlanBlock = missionPlanBlockId => this.app.get(`/plan/${missionPlanBlockId}`) //AGENTS & DIRECTOR ONLY: The MissionPlanBlock
    updateOneMissionPlanBlock = (missionPlanBlockId, title, description, parallelCitizenPlanBlock) => this.app.put(`/plan/${missionPlanBlockId}`, {title, description, parallelCitizenPlanBlock}) //AGENTS ONLY: The updated MissionPlanBlock
    deleteOneMissionPlanBlock = missionPlanBlockId => this.app.delete(`/${missionPlanBlockId}`) //AGENTS & DIRECTOR ONLY: msg: 'MissionPlanBlock deleted successfully'

}


export default MissionService