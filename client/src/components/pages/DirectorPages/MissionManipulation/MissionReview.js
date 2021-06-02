import './../Director.css'
import { Component } from 'react'
import { Container } from 'react-bootstrap'
//import { Container, Row, Col, Button } from 'react-bootstrap'
//import { Link } from 'react-router-dom'

import MissionService from '../../../../service/mission.service'

class MissionReview extends Component {

    constructor() {
        super()
        this.state = {
            mission: undefined
        }
        this.missionService = new MissionService()
    }

    componentDidMount() {

        const { missionId } = this.props.match.params

        this.missionService
            .getOneMission(missionId)
            .then(response => {
                this.setState({ mission: response.data })
            })
            .catch(err => this.props.handleAlert(err.response.data.message))
    }

    render() {

        const { mission } = this.state
        console.log(mission)

        return (

            <Container>
                {
                    !mission ?
                        <h1>LOADING MISSION</h1>
                    :
                        <h1>{mission.codename}</h1>
                }
            </Container>
        )
    }
}

export default MissionReview