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

export const GetNotesFromStorage = function () {
  return JSON.parse(localStorage.getItem('notes'));
};

export const SetNotesInStorage = function (notes) {
  localStorage.setItem('notes', JSON.stringify(notes));
};

export const GetNewFileName = function (FileArr, defaultName) {
  let isKeepTrying = true;
  let fileName = defaultName;
  const defaultFileName = defaultName;
  let counter = 0;

  const namearr = [];
  for (let i = 0; i < FileArr.length; i += 1) {
    const newFileName = FileArr[i].name;
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
