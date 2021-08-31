import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
// API request
import { showItems, deleteItem } from '../../api/items'

import Button from 'react-bootstrap/Button'

class ShowItems extends Component {
  constructor (props) {
    super(props)

    this.state = {
      // using null as a starting value will help us manage the "loading state" of our ShowItems component
      item: null
    }
  }

  componentDidMount () {
    // one of the automatic router props we get is the match object - that has data about the params in our front-end route url
    const { match, user, msgAlert } = this.props
    console.log(this.props)
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

  handleDelete = (event) => {
    const { match, user, msgAlert, history } = this.props
    deleteItem(match.params.id, user)
      // Redirect to the list of items
      .then(() => history.push('/items'))
      .then(() => msgAlert({ heading: 'Deleted item successfully', message: 'item is no more', variant: 'success' }))
      .catch(err => msgAlert({ heading: 'Delete item failed :(', message: 'Something went wrong: ' + err.message, variant: 'danger' }))
  }

  render () {
    if (this.state.item === null) {
      return 'Loading...'
    }

    // Get the owner (a user id) from the item state
    const { description, price, quantity, owner } = this.state.item
    const { history, match, user } = this.props

    return (
      <>
        <h3>Show One Item Page</h3>
        <h5>{description}</h5>
        <p>price: {price}</p>
        <p>quantity: {quantity}</p>
        {/* Compare the signed in user's ID against the owner of this item */}
        {user._id === owner && (
          <>
            <Button onClick={this.handleDelete}>Delete</Button>
            {/* Button with a Link inside should work but is ugly. Better way below. */}
            {/* <Button><Link to={`/items/${match.params.id}/edit`}>Update</Link></Button> */}
            {/* Provide the Button a `onClick` handler & use the history object to redirect the user */}
            <Button onClick={() => history.push(`/items/${match.params.id}/edit`)}>
              Update
            </Button>
          </>
        )}
      </>
    )
  }
}

export default withRouter(ShowItems)
