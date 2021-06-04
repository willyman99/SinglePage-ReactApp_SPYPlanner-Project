import './../Agent.css'
import { Component } from 'react'
import MissionService from './../../../../service/mission.service'

import MissionPlanBlockCard from './MissionPlanBlockCard'

class MissionPlanBlocksList extends Component {

    constructor() {
        super()
        this.state = {
            planBlocks: undefined
        }
        this.missionService = new MissionService()
    }

    componentDidMount() {
        this.loadPlanBlocks()
    }

    loadPlanBlocks() {
        this.missionService
            .getAssignedMissionPlan()
            .then(response => this.setState({ planBlocks: response.data.plan }) )
            .catch(err => this.props.handleAlert(err.response.data.message))
    }

    deleteMissionPlanBlock = missionPlanBlockId => {
        this.missionService
            .deleteOneMissionPlanBlock(missionPlanBlockId)
            .then(response => {
                this.props.handleAlert(response.data.message)
                this.loadPlanBlocks()
            })
            .catch(err => this.props.handleAlert(err.response.data.message))
    }

    render() {
        
        const planBlocks = this.state.planBlocks ? this.state.planBlocks : undefined

        return (

            <div>
                <h3>MISSION PLAN:</h3>
                {
                    !planBlocks ?
                        <h1>LOADING PLANBLOCKS</h1>
                        :
                        <>
                            {
                                planBlocks.length === 0 ?
                                    <h1>YOU HAVE NO PLANS</h1>
                                    :
                                    <>
                                        {planBlocks.reverse().map(elm => <MissionPlanBlockCard key={elm._id} missionPlanBlock={elm} deleteMissionPlanBlock={this.deleteMissionPlanBlock} missionStatus={this.props.missionStatus} />)}
                                    </>
                            }
                        </>
                }
            </div>
        )
    }
}

export default MissionPlanBlocksList