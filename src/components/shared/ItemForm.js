import React from 'react'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const ItemForm = ({ item, handleSubmit, handleChange }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group controlId='description'>
      <Form.Label>Item Description</Form.Label>
      <Form.Control
        required
        name='description'
        value={item.description}
        placeholder='Item Description'
        onChange={handleChange}
      />
    </Form.Group>
    <Form.Group controlId='quantity'>
      <Form.Label>Item Quantity</Form.Label>
      <Form.Control
        onChange={handleChange}
        required
        name='quantity'
        value={item.quantity}
        placeholder='Item Quantity'
      />
    </Form.Group>
    <Form.Group controlId='price'>
      <Form.Label>Item Price</Form.Label>
      <Form.Control
        onChange={handleChange}
        required
        name='price'
        value={item.price}
        placeholder='Item Price'
      />
    </Form.Group>
    <Button type="submit">Submit</Button>
  </Form>

)

export default ItemForm
