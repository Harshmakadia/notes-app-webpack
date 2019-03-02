// This is helper file were all the function which can be commonly used throughout the app are placed here

/**
 * Debouncer function .
 * @param {function} (the name of function where the deboucning has to be applied on)
 * @param {wait} (time is milliseconds for which the debouncing is required)
 * @return null;
 */
export const Debounce = function (func, wait, immediate) {
  let timeout;
  return function () {
    const context = this; const
    /* In ES2015 (ES6) or later, if you don’t want to be notified about arguments variables, then it’s safe to disable prefer-rest-params rule. */
      args = arguments; // eslint-disable-line
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};


/**
 * Get the values from localStorage .
 * @param null
 * @return The JSON (array of objects) containing details of all the notes
 */
export const GetNotesFromStorage = function () {
  return JSON.parse(localStorage.getItem('notes'));
};

/**
 * Set the array of notes in the localStorage .
 * @param {notes} The entire notes array containing all the notes
 * @return nothing (the values are directly set into the localStorage)
 */
export const SetNotesInStorage = function (notes) {
  localStorage.setItem('notes', JSON.stringify(notes));
};


/**
 * Get the new note name .
 * @param {fileArr} The entire notes array containing all the notes.
 * @param {defaultName} num2 The default note name through which new note name will be derived taking reference of all
 * the notes names
 * @return {fileName} The filename will be returned based on the missing sequence.
 */
export const GetNewFileName = function (fileArr, defaultName) {
  let isKeepTrying = true;
  let fileName = defaultName;
  const defaultFileName = defaultName;
  let counter = 0;

  const namearr = [];
  for (let i = 0; i < fileArr.length; i += 1) {
    const newFileName = fileArr[i].name;
    namearr.push(newFileName);
  }

  do {
    if (namearr.indexOf(fileName) > -1) {
      counter += 1;
      fileName = defaultFileName + counter;
      isKeepTrying = true;
    }
    else {
      isKeepTrying = false;
    }
  } while (isKeepTrying);
  return fileName;
};
