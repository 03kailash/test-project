import React, { useState } from 'react';
import { FaFolderOpen, FaRegFileAlt, FaFolder, FaPlusCircle } from "react-icons/fa";
import { MdModeEdit, MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { createFile, createFolder, deleteItem, renameItem, openFile } from '../redux/actions/actions';
import '../App.css';

const FileExplorer = () => {
  const [expandedFolders, setExpandedFolders] = useState([]);
  const [newFolderName, setNewFolderName] = useState('');
  const [newFileName, setNewFileName] = useState('');
  const [renamingItem, setRenamingItem] = useState(null);
  const [newName, setNewName] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const fileSystem = useSelector(state => state.fileSystem);

 


  const toggleFolder = (name) => {
    const isFolderExpanded = expandedFolders.includes(name);
    const updatedFolders = isFolderExpanded
      ? expandedFolders.filter(folder => folder !== name)
      : [...expandedFolders, name];
    
    setExpandedFolders(updatedFolders);
  };
  const handleCreateFolder = () => {
    if (!newFolderName.trim()) {
      setError('Folder name cannot be empty');
      return;
    }
    dispatch(createFolder(newFolderName));
    setNewFolderName('');
    setError('');
  };

  const handleCreateFile = () => {
    if (!newFileName.trim()) {
      setError('File name cannot be empty');
      return;
    }
    dispatch(createFile(newFileName));
    setNewFileName('');
    setError('');
  };

  const handleDeleteItem = (itemName) => {
    if (window.confirm(`Are you sure you want to delete "${itemName}"?`)) {
      dispatch(deleteItem(itemName));
    }
  };

  const handleRenameItem = (itemName) => {
    setRenamingItem(itemName);
    setNewName(itemName);
  };

  const handleSaveRename = () => {
    if (!newName.trim()) {
      setError('New name cannot be empty');
      return;
    }
    dispatch(renameItem(renamingItem, newName));
    setRenamingItem(null);
    setNewName('');
    setError('');
  };

  const handleFileClick = (fileName) => {
    dispatch(openFile(fileName));
  };

  const renderTree = (node) => {
    if (!node || !node.children) {
      return null;
    }
    return (
      <ul>
        {node.children.map((child, index) => (
          <li key={index}>
            <div className="item">
              {child.type === 'directory' ? (
                <div style={{display:"flex", alignItems:"center",gap:'3px'}}>
                  <span onClick={() => toggleFolder(child.name)} style={{display:"flex", alignItems:"center",gap:'3px'}}>
                    {expandedFolders.includes(child.name) ? <FaFolderOpen /> : <FaFolder />}
                    {renamingItem === child.name ? (
                      <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        onBlur={handleSaveRename}
                        autoFocus
                      />
                    ) : (
                      <>
                        {child.name}
                        <MdModeEdit onClick={() => handleRenameItem(child.name)} />
                      </>
                    )}
                  </span>
                  {expandedFolders.includes(child.name) && renderTree(child)}
                </div>
              ) : (
                <div style={{display:"flex", alignItems:"center",gap:'3px'}}>
                  <span onClick={() => handleFileClick(child.name)} style={{display:"flex", alignItems:"center",gap:'3px'}}>
                    <FaRegFileAlt />
                    {renamingItem === child.name ? (
                      <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        onBlur={handleSaveRename}
                        autoFocus
                      />
                    ) : (
                      <>
                        {child.name}
                        <MdModeEdit onClick={() => handleRenameItem(child.name)} />
                      </>
                    )}
                  </span>
                  <MdDeleteForever onClick={() => handleDeleteItem(child.name)} />
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="file-explorer">
      <div className="error">{error}</div>
      <div className="controls">
        <input
          type="text"
          placeholder="Enter folder name"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
        />
        <button onClick={handleCreateFolder}><FaPlusCircle /> Create Folder</button>
      </div>
      <div className="controls">
        <input
          type="text"
          placeholder="Enter file name"
          value={newFileName}
          onChange={(e) => setNewFileName(e.target.value)}
        />
        <button onClick={handleCreateFile}><FaPlusCircle /> Create File</button>
      </div>
      {renderTree(fileSystem)}
    </div>
  );
};

export default FileExplorer;
