
import React from 'react';
import './App.css';
import { createStore } from 'redux'; 
import { Provider } from 'react-redux';
import FileExplorer from './FileExplorer/FileExplorer';
import rootReducer from './redux/reducers/reducers';
import { CREATE_FOLDER, DELETE_ITEM, OPEN_FILE, RENAME_ITEM, TOGGLE_FOLDER } from './redux/actions/actions';

const store = createStore(rootReducer);

const App = () => {
  const handleFileClick = (fileName) => {
    store.dispatch(OPEN_FILE(fileName));
  };

  const handleFolderToggle = (folderName) => {
    store.dispatch(TOGGLE_FOLDER(folderName));
  };

  const handleCreateFolder = (folderName) => {
    store.dispatch(CREATE_FOLDER(folderName));
  };

  const handleDeleteItem = (itemName) => {
    store.dispatch(DELETE_ITEM(itemName));
  };

  const handleRenameItem = (itemName, newName) => {
    store.dispatch(RENAME_ITEM(itemName, newName));
  };

  return (
    <Provider store={store}>
      <div className="app">
        <div className="sidebar">
          <h2>File Explorer</h2>
          <FileExplorer
            data={handleFileClick}
            onFolderToggle={handleFolderToggle}
            onCreateFolder={handleCreateFolder}
            onDeleteItem={handleDeleteItem}
            onRenameItem={handleRenameItem}
          />
        </div>
        <div className="content">
          <h2>Content Area</h2>
          {/* Implement content display */}
        </div>
      </div>
    </Provider>
  );
};

export default App;

