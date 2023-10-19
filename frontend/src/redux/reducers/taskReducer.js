const imitial_state = {
  data: [],
  message: '',
  success: null,
  error: null,
}

export default function projectReducer(state = imitial_state, action) {
  switch (action.type) {
    case 'GET_TASKS':
      return {
        ...state,
        data: action.payload
      };
    case 'CREATE_TASK':
      return {
        ...state,
        data: [ action.payload, ...state.data ],
      };
    case 'UPDATE_TASK':
      return {
        ...state,
        data: state.data.map(item => action.payload._id === item._id ? action.payload : item),
      };
    case 'DELETE_TASK':
      return {
        ...state,
        data: state.data.filter(item => action.payload._id !== item._id),
      };
    default:
      return state;
  }
}