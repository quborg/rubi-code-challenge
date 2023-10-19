import React from 'react';

import { Form, FormGroup, Label, Input } from 'reactstrap';

const NewForm = props => {
  const { type, data = {}, onChange, projects = [], readonly = false } = props;

  return (
    <Form>
      <FormGroup className='form-group'>
        <Label>Label *</Label>
        <Input
          readOnly={readonly}
          name="label"
          placeholder="write a label"
          type="text"
          value={data.label}
          onChange={onChange}
        />
      </FormGroup>
      <FormGroup className='form-group'>
        <Label>Description *</Label>
        <Input
          readOnly={readonly}
          name="description"
          placeholder="write a description"
          type="textarea"
          rows='6'
          value={data.description}
          onChange={onChange}
        />
      </FormGroup>
      {
        type === 'task' ?
          <FormGroup className='form-group'>
            <Label>Project *</Label>
            <Input
              readOnly={readonly}
              name="project"
              placeholder="Select a project .."
              type="select"
              value={data.project}
              onChange={onChange} >
              {
                projects.map(proj => (
                  <option key={proj._id} value={proj._id}>{proj.label}</option>
                ))
              }
            </Input>
          </FormGroup> : <></>
      }
      <FormGroup className='form-group'>
        <Label>Started at *</Label>
        <Input
          readOnly={readonly}
          name="start_date"
          placeholder="Pick a date"
          type="date"
          value={(data.start_date).split('T')[0]}
          onChange={onChange}
        />
      </FormGroup>
      <FormGroup className='form-group'>
        <Label>Ended at *</Label>
        <Input
          readOnly={readonly}
          name="end_date"
          placeholder="Pick a date"
          type="date"
          value={(data.end_date).split('T')[0]}
          onChange={onChange}
        />
      </FormGroup>
    </Form>
  )
}

export default NewForm;