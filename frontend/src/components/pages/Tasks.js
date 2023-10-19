import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Modal } from '../ui';
import { getTasks, getProjects, createTask, updateTask, deleteTask } from '../../redux/actions';
import Form from './Form';

const TODAY = (new Date()).toISOString().split('T')[0];
const INITIAL_FORM = {
  label: '',
  description: '',
  project: '',
  start_date: TODAY,
  end_date: TODAY,
};

class Tasks extends Component {
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
    this.props.getTasks();
    this.props.getProjects();
  }

  onCreate = () => {
    this.props.createTask(this.state.form);
  }

  onUpdate = () => {
    this.props.updateTask(this.state.form);
  }

  onDelete = () => {
    this.props.deleteTask(this.state.form);
  }

  openModal = (type, item) => {
    switch (type) {
      case 'create':
        this.setState({
          modal: {
            open: true,
            action: type,
            title: <div>
              <i className='fas fa-clipboard-list' />
              <span>Create task</span>
              <div><small>Fill your task attributs</small></div>
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
              <i className='fas fa-clipboard-list' />
              <span>Update task</span>
              <div><small>Put your task changes</small></div>
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
              <i className='fas fa-clipboard-list' />
              <span>Delete task</span>
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
    console.log([e.target.name], e.target.value)
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    })
  }

  render() {
    const data = this.props.tasks;
    const columns = ['label', 'description', 'project', 'started At', 'ended At', 'created At', 'updated At'];
    const schemaKeys = ['label', 'description', 'project', 'start_date', 'end_date', 'createdAt', 'updatedAt'];

    return (
      <div className='table-wrapper'>
        <div className='table-topbar'>
          <Button label='New Task' icon='plus' onClick={() => this.openModal('create')} color='secondary' />
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
          <Form type='task' data={this.state.form} onChange={this.onChangeForm} projects={this.props.projects} readonly={this.state.modal.action === 'delete'} />
        </Modal> }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { 
    tasks: state.tasks.data,
    projects: state.projects.data
  }
}

export default connect(
  mapStateToProps, {
  getTasks,
  getProjects,
  createTask,
  updateTask,
  deleteTask,
}
)(Tasks);