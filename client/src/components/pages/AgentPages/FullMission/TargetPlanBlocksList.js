import './../Agent.css'
import { Component } from 'react'

import PlannerService from './../../../../service/planner.service'

import TargetPlanBlockCard from './TargetPlanBlockCard'

class TargetPlanBlocksList extends Component {

    constructor() {
        super()
        this.state = {
            planBlocks: undefined
        }
        this.plannerService = new PlannerService()
    }

    componentDidMount() {
        this.loadPlanBlocks()
    }

    loadPlanBlocks() {
        this.plannerService
            .getSomeUserPlanBlocks(this.props.targetId)
            .then(response => {
                this.setState({ planBlocks: response.data.plans })
            })
            .catch(err => this.props.handleAlert(err.response.data.message))
    }

    render() {
        
        const planBlocks = this.state.planBlocks ? this.state.planBlocks : undefined

        return (

            <div>
                <h3>TARGET'S PLANS:</h3>
                {
                    !planBlocks ?
                        <h1>LOADING TARGET'S PLANBLOCKS</h1>
                        :
                        <>
                            {planBlocks.reverse().map(elm => <TargetPlanBlockCard key={elm._id} planBlock={elm} missionStatus={this.props.missionStatus}/>)}
                        </>
                }
            </div>
        )
    }
}

export default TargetPlanBlocksList