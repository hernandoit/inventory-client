/* eslint-disable no-tabs */
// Import react - also destructuring Component & Fragment classes
// `React` itself is required for writing JSX code
import React, { Component, Fragment } from 'react'
// Destructuring Route component from react-router-dom
import { Route } from 'react-router-dom'
// import the `v4` object (whatever that is) BUT call it `uuid`
// uuid package generates unique id (identifiers)
import { v4 as uuid } from 'uuid'
// Import individual custom components from our components directory
import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
// Import Auth components
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import ChangePassword from './components/auth/ChangePassword'
// Import our Items components
import CreateItem from './components/items/CreateItem'
import IndexItems from './components/items/IndexItems'
import ShowItems from './components/items/ShowItems'
import UpdateItem from './components/items/UpdateItem'
// Creating a new class (App) & inheriting (getting/recieving) all the functionality of the Component class
class App extends Component {
  // Set the state in the constructor
  // Constructor function sets up the component for the first time
  // with any initial data
  // NOT react specific - this is vanilla JS
  constructor (props) {
    // Takes props from constructor and passes them to super
    // brings in the parent constructor!
    // allow us to override things setup by the Component class
    super(props)
    // user is going to represent the signed in user
    // msgAlerts is going to represent all the visible alerts on the page at one time
    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  // accepts a user object
  // and sets the user in the state
  setUser = (user) => this.setState({ user })

  // set the user in the state back to null
  clearUser = () => this.setState({ user: null })

  deleteAlert = (id) => {
    this.setState((state) => {
      return {
        // .filter does not "modify in place" the state.msgAlerts array
        // instead, it returns a new instance of an array
        // Removes the msgAlert object with the ID passes in as a parameter from the array
        msgAlerts: state.msgAlerts.filter((msg) => msg.id !== id)
      }
    })
  }

  // Call this to show a new alert
  // It accepts ONE object - which has THREE keys (heading, message, variant)
  // Destructuring the incoming object to get `heading`, `message`, and `variant` available inside the method
  msgAlert = ({ heading, message, variant }) => {
    // 1. Generate a universally unique identifier for this message alert
    const id = uuid()
    // 2. Set the state using the setState method & pass it a callback
    // `state` is passed automagically from setState method
    // it will be the "current" or "previous" state
    // important: NEVER JUST USE this.state TO UPDATE THE STATE
    // if you need to use the state to update the state, you MUST
    // pass this callback function
    this.setState((state) => {
      // 3. Spread operator - "spreads" out data in data structures
      // It'll take an array/object and remove a level
      // ...[1, 2, 3] => 1, 2, 3
      // [ ...[1, 2, 3], 4, 5, 6] => [1, 2, 3, 4, 5, 6]
      // ...{ key: 'value' } => key: 'value'
      // We use the spread operator here so we do NOT MODIFY the state.msgAlerts array. Instead we take it's contents, put those contents in a new array, and add another object to the array at the end.
      return {
        msgAlerts: [...state.msgAlerts, { heading, message, variant, id }]
      }
    })
  }

  render () {
    // Destructuring (create msgAlerts and user variables)
    const { msgAlerts, user } = this.state

    // Fragments save us from div "he11"
    // Provide the wrapper that React needs but it doesn't
    // actually render anything on the page itself.
    // Shorthand: <> </>
    return (
      <Fragment>
        {/* Header component contains navigation bar.
        `user` object state is passed to the Header. */}
	      <Header user={user} />
        {/* This .map will return a new array filled with JSX objects (our message alert components) & each component will be rendered on the page. */}
	      {msgAlerts.map((msgAlert) => (
          <AutoDismissAlert
            key={msgAlert.id}
            id={msgAlert.id}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
            deleteAlert={this.deleteAlert}
          />
        ))}
	      <main className='container'>
	        <Route
            path='/sign-up'
            render={() => (
              <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
            )}
          />
          <Route
            path='/sign-in'
            render={() => (
              <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
            )}
          />
          {/* Authenticated Route is not a React/React-router-dom component. This is a custom component BUILT BY GA for you to use in your projects. */}
          {/* We MUST pass the `user` state object to the `AuthenticatedRoute` component - otherwise, the route will never be hit. */}
          <AuthenticatedRoute
            user={user}
            path='/sign-out'
            render={() => (
              <SignOut
                msgAlert={this.msgAlert}
                clearUser={this.clearUser}
                user={user}
              />
            )}
          />
          <AuthenticatedRoute
            user={user}
            path='/change-password'
            render={() => (
              <ChangePassword msgAlert={this.msgAlert} user={user} />
            )}
          />
          <AuthenticatedRoute
            user={user}
            path='/create-item'
            render={() => (
              <CreateItem msgAlert={this.msgAlert} user={user}/>
            )}
          />
          <AuthenticatedRoute
            user={user}
            exact
            path='/items'
            render={() => <IndexItems msgAlert={this.msgAlert} user={user}/>}
          />
          <AuthenticatedRoute
            user={user}
            exact
            path='/items/:id'
            render={() => (
              <ShowItems user={user} msgAlert={this.msgAlert}/>
            )}
          />
          <AuthenticatedRoute
            user={user}
            path='/items/:id/edit'
            render={() => (
              <UpdateItem user={user} msgAlert={this.msgAlert}/>
            )}
          />
        </main>
      </Fragment>
    )
  }
}

export default App
