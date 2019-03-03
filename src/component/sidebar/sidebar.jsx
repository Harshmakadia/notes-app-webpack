// Importing Modules, Components and functions
import React from 'react';
import PropTypes from 'prop-types';

// Importing CSS files
import './sidebar.css';

// Defining Stateless function
function Sidebar(props) {
  const {
    notes, addNewNotes, onSearchTrigger, searchText, deleteNote, closeSidebar, openNote,
  } = props;
  const noteItems = notes.map(note => (
    <div role="presentation" className="note-title-section" key={note.id} onClick={() => openNote(note.id)}>
      <span className="notes-title">{note.name}</span>
      <span role="presentation" className="close-icon" onClick={() => deleteNote(note.id)}>X</span>
    </div>
  ));

  return (
    <div className="sidenav">
      <span role="presentation" className="close-icon-main" onClick={() => closeSidebar(false)}>X</span>
      <div role="presentation" className="note-title-section" onClick={addNewNotes}> Add Note ( + ) </div>
      <input
        type="text"
        placeholder="Search...."
        name="search"
        onChange={onSearchTrigger}
        className="search-section"
        value={searchText}
      />

      {noteItems}
    </div>
  );
}

Sidebar.propTypes = {
  onSearchTrigger: PropTypes.func,
  addNewNotes: PropTypes.func,
  deleteNote: PropTypes.func,
  searchText: PropTypes.string,
  notes: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.object, PropTypes.array]),
  openNote: PropTypes.func,
  closeSidebar: PropTypes.func,
};
Sidebar.defaultProps = {
  searchText: '',
  onSearchTrigger: () => null,
  addNewNotes: () => null,
  deleteNote: () => null,
  openNote: () => null,
  closeSidebar: () => null,
  notes: [],
};

export default Sidebar;
