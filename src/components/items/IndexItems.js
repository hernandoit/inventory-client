// Reminder: Don't forget to render this component in a route (or AuthenticatedRoute) in App.js

// Imports:
// - React, Component
import React, { Component } from 'react'
// - Link
import { Link } from 'react-router-dom'
// - indexItems (or something) (api function)
import { indexItems } from '../../api/items'
// - optional messages

// Create a new class inherits from Component
class IndexItems extends Component {
  // - constructor (set up initial state)
  constructor (props) {
    super(props)

    this.state = {
      // items: []
      items: null
    }
  }

  // - lifecycle method (right away when this component renders, make a request for all the items & put em in state)
  componentDidMount () {
    const { user, msgAlert } = this.props
    indexItems(user)
      .then(res => this.setState({ items: res.data.items }))
      .then(() => msgAlert({ heading: 'Index success', message: 'Here\'s the items', variant: 'success' }))
      .catch(err => msgAlert({ heading: 'Index failed :(', message: 'Something went wrong: ' + err.message, variant: 'danger' }))
  }

  // - render - display the items in the state (optionally: loading message)
  render () {
    const { items } = this.state
    // This is what prevents the "cannot read property map of undefined" or other similar errors because on the first render, `items` state will be `null`
    if (items === null) {
      return 'Loading...'
    }

    let itemJsx
    if (items.length === 0) {
      itemJsx = 'No items, go create some'
    } else {
      // I want itemJsx to be a bunch of li or Link or something with all my items info in them
      // .map gives us back a new array that we can display
      itemJsx = items.map(item => (
        <li key={item._id}>
          <Link to={`/items/${item._id}`}>
            {item.description}
          </Link>
          price: {item.price}
          quantity: {item.quantity}
        </li>
      ))
    }

    return (
      <>
        <h3>All The Items:</h3>
        {itemJsx}
      </>
    )
  }
}

export default IndexItems
