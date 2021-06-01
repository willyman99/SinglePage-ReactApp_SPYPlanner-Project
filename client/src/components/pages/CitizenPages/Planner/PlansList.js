import './Planner.css'

import { Component } from 'react'
import { Row } from 'react-bootstrap'

import PlannerService from '../../../../service/planner.service'

import ListedPlanBlock from './ListedPlanBlock'



class PlansList extends Component {

    constructor() {
        super()
        this.state = {
            plans: undefined
        }
        this.plannerService = new PlannerService()
    }


    componentDidMount() {
        this.loadPlans()
    }

    loadPlans() {
        this.plannerService
            .getUserPlanBlocks()
            .then(response => {
                this.setState({ plans: response.data.plans })
            })
            //.catch
    }


    render() {

        const { plans } = this.state

        return (

        !plans ?
            <h1>LOADING ALL PLANBLOCKS</h1>
        :
            plans.length === 0 ?
                <h1>YOU HAVE NO PLANS</h1>
            :    
                <>
                    <Row>
                        {plans.map(elm =>
                            <ListedPlanBlock
                                key={elm._id}
                                {...elm}
                                loggedUser={this.props.loggedUser}
                                reload={() => this.loadPlans()} 
                                />
                        )}
                    </Row>
                </>
        )
    }
}

export default PlansList