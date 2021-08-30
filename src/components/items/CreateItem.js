import React, { Component } from 'react'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { createItem } from '../../api/items'

import { withRouter } from 'react-router-dom'
class CreateItem extends Component {
  constructor (props) {
    super(props)
    this.state = {
      description: '',
      quantity: '',
      price: ''
    }
  }

  handleChange = (event) => {
    // the event.target of this event will be an input element
    // which will have a `name` attribute (key in the state) & a 'value' (what the user typed)
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmmit = (event) => {
    event.preventDefault()

    const { user, msgAlert, history } = this.props

    createItem(this.state, user)
      .then(res => history.push('/'))
      .then(() => msgAlert({ heading: 'Item Created!', message: 'Nice work, go check out your item.', variant: 'success' }))
      .catch(err => {
        msgAlert({
          heading: 'Item creation failed :(',
          message: 'Something went wrong: ' + err.message,
          variant: 'danger'
        })
      })
  }

  render () {
    return (
      <>
        <Form onSubmit={this.handleSubmmit}>
          <Form.Group>
            <Form.Label>Item Description
            </Form.Label>
            <Form.Control
              required
              onChange={this.handleChange}
              name='description'
              value= {this.state.description}
              placeholder='Description'
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Item Quantity
            </Form.Label>
            <Form.Control
              required
              name='quantity'
              onChange={this.handleChange}
              value= {this.state.quantity}
              placeholder='Quantity'
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Item Price
            </Form.Label>
            <Form.Control
              required
              name='price'
              onChange={this.handleChange}
              value= {this.state.price}
              placeholder='Price'
            />
          </Form.Group>
          <Button type="submit">Create Item</Button>
        </Form>
      </>
    )
  }
}

export default withRouter(CreateItem)
