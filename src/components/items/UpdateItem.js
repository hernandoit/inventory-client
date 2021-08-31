import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
// API request
import { updateItem, showItems } from '../../api/items'
import ItemForm from '../shared/ItemForm'

class UpdateItem extends Component {
  constructor (props) {
    super(props)

    this.state = {
      // using null as a starting value will help us manage the "loading state" of our UpdateItem component
      item: { // this should not be null
        description: '', // must provide starting values for the form inputs
        quantity: '',
        price: ''
      }
    }
  }

  componentDidMount () {
    // one of the automatic router props we get is the match object - that has data about the params in our front-end route url
    const { match, user, msgAlert } = this.props

    showItems(match.params.id, user)
      .then(res => this.setState({ item: res.data.item }))
      .then(() => msgAlert({
        heading: 'Show item success',
        message: 'Check out the item',
        variant: 'success'
      }))
      .catch(err => msgAlert({
        heading: 'Show item failed :(',
        message: 'Something went wrong: ' + err.message,
        variant: 'danger'
      }))
  }

  handleChange = (event) => {
    // because `this.state.item` is an object with multiple keys, we have to do some fancy updating
    const userInput = { [event.target.name]: event.target.value }
    this.setState(currState => {
      // "Spread" out current item state key/value pairs, then add the new one at the end
      // this will override the old key/value pair in the state but leave the others untouched
      return { item: { ...currState.item, ...userInput } }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const { user, msgAlert, history, match } = this.props

    updateItem(this.state.item, match.params.id, user)
      .then(res => history.push('/items/' + match.params.id))
      .then(() => msgAlert({ heading: 'Item Updated!', message: 'Nice work, go check out your item.', variant: 'success' }))
      .catch(err => {
        msgAlert({
          heading: 'Item update failed :(',
          message: 'Something went wrong: ' + err.message,
          variant: 'danger'
        })
      })
  }

  render () {
    return (
      <>
        <h3>Update One Item Page</h3>
        <ItemForm
          item={this.state.item}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
      </>
    )
  }
}

export default withRouter(UpdateItem)
