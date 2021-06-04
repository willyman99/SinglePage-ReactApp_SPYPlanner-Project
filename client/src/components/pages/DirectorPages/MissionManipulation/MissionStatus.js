import './../Director.css'

import { Component } from 'react'
import { Button } from 'react-bootstrap'

import MissionPlan from './MissionPlan'

class MissionStatus extends Component {
    
    constructor() {
        super()
        this.state = {
            status: undefined
        }
    }

    componentDidMount() {
        this.loadStatus()
    }

    loadStatus() {
        this.setState({status: this.props.status})
    }

    approveAndReload() {
        this.setState({status: 'approved'})
        this.props.approve()
    }

    rejectAndReload() {
        this.setState({status: 'rejected'})
        this.props.reject()
        this.loadStatus()
    }

    missionOptions() {
        switch (this.state.status) {
            
            case ('pending'):
            case ('rejected'):
                return (
                    <>
                        <hr/>
                        <Button variant="success" onClick={() => this.approveAndReload()} >APPROVE PLANS</Button>
                        <Button variant="danger" onClick={() => this.rejectAndReload()} >REJECT PLANS</Button>
                        <MissionPlan missionId={this.props.missionId} handleAlert={this.props.handleAlert} isDirector={this.props.isDirector}/>
                    </>
                )
                
            case ('approved'):
                return (
                    <>
                        <h1>PLANS APPROVED!</h1>
                        <Button variant="success" onClick={() => this.props.awardAndDelete()} >AWARD MEDAL TO {this.props.agent.username} & DELETE MISSION </Button>
                    </>
                )
            case ('unplanned'):
            default:
                return <h1> AGENT HAS NO PLANS YET </h1>
        }
    }

    render() {
        const { status } = this.state
        return (
            <>
                {
                    !status ?
                        <h1>LOADING STATUS</h1>
                    :
                        this.missionOptions()
                }
            </>
        )
    }
}

export default MissionStatus