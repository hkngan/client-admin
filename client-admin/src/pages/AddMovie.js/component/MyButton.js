import React from 'react'
import {Col, Button} from 'react-bootstrap';

const MyButton = (props) => {
  return (
    <Button as={Col} variant="danger" className="button-add" type="submit" onClick={props.onClick}>
      {props.title}
    </Button>
  )
}

export default MyButton