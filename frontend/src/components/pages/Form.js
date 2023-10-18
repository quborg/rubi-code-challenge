import React from 'react';

import { Form, FormGroup, Label, Input } from 'reactstrap';

const NewForm = props => {

  return (
    <Form>
      <FormGroup className='form-group'>
        <Label>Label *</Label>
        <Input name="label" placeholder="write a label" type="text" />
      </FormGroup>
      <FormGroup className='form-group'>
        <Label>Description *</Label>
        <Input name="description" placeholder="write a description" type="textarea" rows='6' />
      </FormGroup>
      {
        props.type === 'task' ?
          <FormGroup className='form-group'>
            <Label>Project *</Label>
            <Input name="project" placeholder="Select a project .." type="select">
              <option>1</option>
              <option>2</option>
            </Input>
          </FormGroup> : <></>
      }
      <FormGroup className='form-group'>
        <Label>Started at *</Label>
        <Input name="start_date" placeholder="Pick a date" type="date" />
      </FormGroup>
      <FormGroup className='form-group'>
        <Label>Ended at *</Label>
        <Input name="end_date" placeholder="Pick a date" type="date" />
      </FormGroup>
    </Form>
  )
}

export default NewForm;