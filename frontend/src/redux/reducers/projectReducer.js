export default function projectReducer(state = [], action) {

  switch (action.type) {
    case 'GET_PROJECTS':
      return action.payload;
    case 'CREATE_PROJECT':
      return action.payload;
    case 'UPDATE_PROJECT':
      return action.payload;
    case 'DELETE_PROJECT':
      return action.payload;
    default:
      return state;
  }
}