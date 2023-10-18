import projectReducer from './projectReducer';
import taskReducer from './taskReducer';

const rootReducer = {
  projects: projectReducer,
  tasks: taskReducer,
};

export default rootReducer;