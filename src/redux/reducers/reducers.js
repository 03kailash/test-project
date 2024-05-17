import { combineReducers } from 'redux';
import { OPEN_FILE, TOGGLE_FOLDER, CREATE_FOLDER, DELETE_ITEM, RENAME_ITEM,CREATE_FILE } from "../actions/actions"

// Initial state
const initialState = {
  fileSystem: {
    name: 'root',
    type: 'directory',
    children: [
      {
        name: 'Documents',
        type: 'directory',
        children: [
          { name: 'Resume.docx', type: 'file' },
          { name: 'Report.pdf', type: 'file' }
        ]
      },
      {
        name: 'Pictures',
        type: 'directory',
        children: [
          { name: 'Vacation.jpg', type: 'file' },
          { name: 'Family.png', type: 'file' }
        ]
      }
    ]
  }
};

const fileSystemReducer = (state = initialState.fileSystem, action) => {
  switch (action.type) {
    case OPEN_FILE:
      return state;
    case TOGGLE_FOLDER:
      return {
        ...state,
      };
    case CREATE_FOLDER:
      return {
        ...state,
        children: [...state.children, { name: action.payload, type: 'directory', children: [] }]
      };
    case CREATE_FILE:
      return {
        ...state,
        children: [...state.children, { name: action.payload, type: 'file' }]
      };
    case DELETE_ITEM:
      return state;
    case RENAME_ITEM:
      return state;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  fileSystem: fileSystemReducer
});

export default rootReducer;
