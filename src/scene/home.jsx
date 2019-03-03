// Importing Modules, Components and functions
import React, { Component } from 'react';
import Sidebar from '../component/sidebar/sidebar';
import { GetNotesFromStorage, SetNotesInStorage, GetNewFileName } from '../helper';
import MenuIcon from '../component/menu/menu';

// Importing CSS files
import './home.css';

class Home extends Component {
  static saveNotesToStorage(notes) {
    SetNotesInStorage(notes);
  }

  constructor() {
    super();
    this.state = {
      notes: [],
      showNoteDetails: false,
      allNotes: [],
      openNoteObj: {},
      searchText: '',
      showSideBar: true,
    };
    // function Binding
    this.addNewNotes = this.addNewNotes.bind(this);
    this.openNote = this.openNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.onSearchTrigger = this.onSearchTrigger.bind(this);
    this.toggleSideBar = this.toggleSideBar.bind(this);
  }

  componentDidMount() {
    // Get the initial notes from the localStorage if exists
    const notes = GetNotesFromStorage();
    // Set the values in localStorage only if it has any values
    if (notes) {
      this.setState({ notes, allNotes: notes });
    }
  }

  // onSearchTrigger
  onSearchTrigger(event) {
    const { notes } = this.state;
    const allNotes = notes.filter(note => note.name.toLowerCase().search(
      event.target.value.toLowerCase(),
    ) !== -1);
    this.setState({ allNotes, searchText: event.target.value });
  }

  // Method will be called when a new blank node is to be added
  addNewNotes() {
    let { notes } = this.state;
    const noteId = Date.now();
    const fileName = GetNewFileName(notes, 'untitled');
    const openNoteObj = Object.assign({}, { id: noteId, name: fileName, content: '' });
    notes = [openNoteObj, ...notes];
    this.setState({
      notes, showNoteDetails: true, openNoteObj, searchText: '', allNotes: notes,
    }, () => {
      // Saving the Notes in localStorage
      Home.saveNotesToStorage(notes);
    });
  }

  // Deleting a specific note
  deleteNote(noteId) {
    const { notes } = this.state;
    const foundIndex = notes.findIndex(note => note.id === noteId);
    const openNoteObj = Object.assign({}, { id: '', name: '', content: '' });
    if (foundIndex > -1) {
      notes.splice(foundIndex, 1);
      this.setState({
        notes, openNoteObj, showNoteDetails: false, allNotes: notes,
      }, () => {
        // Saving the Notes in localStorage
        Home.saveNotesToStorage(notes);
      });
    }
  }

  // When clicked on a specific note, reveal that note the web page
  openNote(noteId) {
    const { notes } = this.state;
    const foundIndex = notes.findIndex(note => note.id === noteId);
    if (foundIndex > -1) {
      const openNoteObj = Object.assign({}, { id: noteId, name: notes[foundIndex].name, content: notes[foundIndex].content });
      this.setState({
        openNoteObj, showNoteDetails: true, searchText: '', allNotes: notes,
      });
    }
  }

  // Either Title or Content of the note is changed this method will called
  updateNote(event, noteId) {
    const { notes } = this.state;
    const { openNoteObj } = this.state;
    const foundIndex = notes.findIndex(note => note.id === noteId);
    if (foundIndex > -1) {
      const propertyName = event.target.name;

      // Setting value in the state Notes array
      notes[foundIndex][propertyName] = event.target.value;

      // Setting values in appropriate property
      openNoteObj[propertyName] = event.target.value;

      this.setState({ notes, openNoteObj, allNotes: notes }, () => {
        // Saving the Notes in localStorage
        Home.saveNotesToStorage(notes);
      });
    }
  }

  // Toggle the state of sidebar
  toggleSideBar(sidebarStatus) {
    this.setState({ showSideBar: sidebarStatus });
  }

  render() {
    const {
      allNotes, showNoteDetails, openNoteObj, searchText, showSideBar,
    } = this.state;
    return (
      <div className="container-fluid">
        {showSideBar
          ? (
            <Sidebar
              openNote={this.openNote}
              notes={allNotes}
              onSearchTrigger={this.onSearchTrigger}
              searchText={searchText}
              deleteNote={this.deleteNote}
              addNewNotes={this.addNewNotes}
              closeSidebar={this.toggleSideBar}
            />
          ) : (
            <div role="presentation" className="menu-icon-container" onClick={() => this.toggleSideBar(true)}>
              {' '}
              <MenuIcon />
              {' '}
            </div>
          )}

        {showNoteDetails
          ? (
            <div
              className="notes-playground"
              style={{
                marginLeft: showSideBar ? 350 : 0,
              }}
            >
              <input
                name="name"
                type="text"
                className="container-fluid active-title"
                value={openNoteObj.name}
                placeholder="Title"
                onChange={e => this.updateNote(e, openNoteObj.id)}
              />

              <textarea
                name="content"
                rows="20"
                cols="50"
                className="container-fluid active-content"
                placeholder="Content"
                onChange={e => this.updateNote(e, openNoteObj.id)}
                value={openNoteObj.content}
              />
            </div>
          ) : (
            <div className="no-note-message" style={{ marginLeft: showSideBar ? 350 : 0 }}>
              <h1>
                {' '}
                No Note selected
              </h1>
              <i>Navigate to Sidebar to add more notes </i>
            </div>
          )
        }
      </div>
    );
  }
}

export default Home;
