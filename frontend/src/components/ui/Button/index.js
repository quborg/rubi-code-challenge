import React from 'react';

import { Button } from 'reactstrap';

import './index.sass';


const NewButton = props => {
  const { label, icon, onClick, color } = props;

  return <Button onClick={onClick} color={color}>
    { icon ? <i className={`fas fa-${icon} action`} /> : <></> }
    { label ? <span>{label}</span> : <></> }
  </Button>
}

export default NewButton;