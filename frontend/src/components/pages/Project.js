import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Modal } from '../ui';
import { getProjects, createProject, updateProject, deleteProject } from '../../redux/actions/project';
import Form from './Form';

const TODAY = (new Date()).toISOString().split('T')[0];
const INITIAL_FORM = {
  label: '',
  description: '',
  start_date: TODAY,
  end_date: TODAY,
};

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
      form: INITIAL_FORM
    }
  }

  componentDidMount() {
    this.props.getProjects();
  }

  onCreate = () => {
    this.props.createProject(this.state.form);
  }

  onUpdate = () => {
    this.props.updateProject(this.state.form);
  }

  onDelete = () => {
    this.props.deleteProject(this.state.form);
  }

  openModal = (type, item) => {
    switch (type) {
      case 'create':
        this.setState({
          modal: {
            open: true,
            action: type,
            title: <div>
              <i className='fas fa-flag' />
              <span>Create project</span>
              <div><small>Fill your project attributs</small></div>
            </div>,
            onConfirmLabel: 'save'
          }
        })
        break;
      case 'update':
        this.setState({
          modal: {
            open: true,
            action: type,
            title: <div>
              <i className='fas fa-flag' />
              <span>Update project</span>
              <div><small>Put your project changes</small></div>
            </div>,
            onConfirmLabel: 'save'
          },
          form: item
        })
        break;
      case 'delete':
        this.setState({
          modal: {
            open: true,
            action: type,
            title: <div>
              <i className='fas fa-flag' />
              <span>Delete project</span>
              <div><small>This operation is reversible</small></div>
            </div>,
            onConfirmLabel: 'delete'
          },
          form: item
        })
        break;

      default:
        break;
    }
  }

  closeModal = () => {
    this.setState({ modal: { open: false }, form: INITIAL_FORM })
  }

  onConfirmModal = () => {
    switch (this.state.modal.action) {
      case 'create': this.onCreate(); break;
      case 'update': this.onUpdate(); break;
      case 'delete': this.onDelete(); break;

      default:
        break;
    }
    this.closeModal();
  }

  onChangeForm = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    })
  }

  render() {
    const data = this.props.projects;
    const columns = ['label', 'description', 'started At', 'ended At', 'created At', 'updated At'];
    const schemaKeys = ['label', 'description', 'start_date', 'end_date', 'createdAt', 'updatedAt'];

    return (
      <div className='table-wrapper'>
        <div className='table-topbar'>
          <Button label='New Project' icon='plus' onClick={() => this.openModal('create')} color='secondary' />
        </div>
        <br />
        <Table
          columns={columns}
          schemaKeys={schemaKeys}
          data={data}
          onUpdate={(item) => this.openModal('update', item)}
          onDelete={(item) => this.openModal('delete', item)}
        />

        { this.state.modal.open && <Modal {...{ ...this.state.modal }} onConfirm={this.onConfirmModal} closeModal={this.closeModal}>
          <Form data={this.state.form} onChange={this.onChangeForm} readonly={this.state.modal.action === 'delete'} />
        </Modal> }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { projects: state.projects.data }
}

export default connect(
  mapStateToProps, {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
}
)(Projects);