import { Component } from 'react'
import { Form, Button } from 'react-bootstrap'

import PlannerService from './../../../../service/planner.service'

class NewPlanBlockForm extends Component {

    constructor() {
        super()
        this.state = {
            title: '',
            description: '',
            participants: []
        }
        this.plannerService = new PlannerService()
    }


    handleInputChange(e) {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }


    handleSubmit(e) {
        e.preventDefault()

        this.plannerService
            .addBlock(this.state)
            .then(response => {
                console.log(response.data)
                //this.props.history.push('/login')
            })
            .catch(err => {
                console.log(err)
                // const errorMessage = err.response.data.message
                // this.props.handleAlert(errorMessage)
            })
    }


    render() {
        return (

            <Form onSubmit={e => this.handleSubmit(e)}>
                
                <Form.Group controlId="title">
                    <Form.Label>Plan Title</Form.Label>
                    <Form.Control type="text" value={this.state.title} onChange={e => this.handleInputChange(e)} name="title" />
                </Form.Group>

                <Form.Group controlId="description">
                    <Form.Label>Plan Description</Form.Label>
                    <Form.Control type="text" value={this.state.description} onChange={e => this.handleInputChange(e)} name="description" />
                </Form.Group>

                <h3>ADD FRIENDS</h3>

                <Button variant="dark" style={{ width: '100%', marginTop: '20px' }} type="submit">CREATE PLAN BLOCK</Button>
            </Form>
        )
    }
}

export default NewPlanBlockForm