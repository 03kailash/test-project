// Define action types
export const OPEN_FILE = 'OPEN_FILE';
export const TOGGLE_FOLDER = 'TOGGLE_FOLDER';
export const CREATE_FOLDER = 'CREATE_FOLDER';
export const DELETE_ITEM = 'DELETE_ITEM';
export const RENAME_ITEM = 'RENAME_ITEM';
export const CREATE_FILE = 'CREATE_FILE';
// Action creators
export const openFile = (fileName) => ({
  type: OPEN_FILE,
  payload: fileName
});

export const toggleFolder = (folderName) => ({
  type: TOGGLE_FOLDER,
  payload: folderName
});

export const createFolder = (folderName) => ({
  type: CREATE_FOLDER,
  payload: folderName
});

export const createFile = (fileName) => ({
  type: CREATE_FILE,
  payload: fileName
});
export const deleteItem = (itemName) => ({
  type: DELETE_ITEM,
  payload: itemName
});

export const renameItem = (itemName, newName) => ({
  type: RENAME_ITEM,
  payload: { itemName, newName }
});
