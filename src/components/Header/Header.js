import React, { Fragment } from 'react'
// Importing Nav and Navbar from react-bootstrap
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
// Importing Link and NavLink from react-router-dom
import { Link, NavLink } from 'react-router-dom'

// JSX defines the NavLinks for our user when they are signed in
const authenticatedOptions = (
  <Fragment>
    <NavLink to='/create-item' className='nav-link'>Create Item</NavLink>
    <NavLink to='/change-password' className='nav-link'>Change Password</NavLink>
    <NavLink to='/sign-out' className='nav-link'>Sign Out</NavLink>
  </Fragment>
)

// JSX defined the NavLinks for our user when they are NOT signed inf
const unauthenticatedOptions = (
  <Fragment>
    <NavLink to='/sign-up' className='nav-link'>Sign Up</NavLink>
    <NavLink to='/sign-in' className='nav-link'>Sign In</NavLink>
  </Fragment>
)

// JSX defined the NavLinks that will ALWAYS be there (no matter if the user is signed in or not)
const alwaysOptions = (
  <Fragment>
    <NavLink exact to='/' className='nav-link'>Home</NavLink>
  </Fragment>
)

// Accepts 1 prop - the user object (App state)
const Header = ({ user }) => (
  <Navbar bg='primary' variant='dark' expand='md'>
    <Navbar.Brand>
      <Link to='/' style={{ color: '#FFF', textDecoration: 'none' }}>IMS</Link>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls='basic-navbar-nav' />
    <Navbar.Collapse id='basic-navbar-nav'>
      <Nav className='ml-auto'>
        {/* something && somethingElse
          if `something` is truthy, return `somethingElse`
          otherwise, don't do anything
        */}
        {user && (
          <span className='navbar-text mr-2'>Welcome, {user.email}</span>
        )}
        {alwaysOptions}
        {/* if the user exists, show the authenticatedOptions, otherwise show the unauthenticatedOptions */}
        {user ? authenticatedOptions : unauthenticatedOptions}
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
