import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Modal } from '../ui';
import { getProjects, createProject } from '../../redux/actions';
import Form from './Form';

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: {
        open: false,
        action: '',
        title: '',
        onConfirmLabel: ''
      },
      projects: []
    }
  }

  componentDidMount() {
    this.props.getProjects();
  }

  onCreate = () => {
    this.props.createProject();
  }

  onEdit = _id => {
    console.log("editing", _id)
  }

  onDelete = _id => {
    console.log("deleting", _id)
  }

  openModal = (type) => {
    switch (type) {
      case 'create':
        this.setState({ 
          modal: {
            open: true,
            action: 'create',
            title: <div>
              <i className='fas fa-flag' />
              <span>Add new project</span>
              <div><small>Fill your project attributs</small></div>
            </div>,
            onConfirmLabel: 'save'
          }
        })
        break;
    
      default:
        break;
    }
  }

  closeModal = () => {
    this.setState({ modal: { open: false } })
  }

  onConfirm = () => {
    switch (this.state.modal.action) {
      case 'create': this.onCreate(); break;
      case 'update': this.onUpdate(); break;
      case 'delete': this.onDelete(); break;
    
      default:
        break;
    }
  }

  render() {
    const data = this.props.projects;
    let schemaKeys, columns;

    if (data && data.length) {
      schemaKeys = Object.keys(data[0]);
      delete schemaKeys._id;
      columns = schemaKeys.map(i => i.replace("_", " "));
    }

    return (
      <div className='table-wrapper'>
        <div className='table-topbar'>
          <Button label='New Project' icon='plus' onClick={() => this.openModal('create')} color='secondary' />
        </div>
        <br />
        <Table {...{columns, data, onEdit: this.onEdit, onDelete: this.onDelete, schemaKeys}} />
        <Modal {...{...this.state.modal}} onConfirm={this.onConfirm} closeModal={this.closeModal}>
          <Form type='project' />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { projects: state.projects }
}

export default connect(
  mapStateToProps, { 
    getProjects,
    createProject,
  }
)(Projects);