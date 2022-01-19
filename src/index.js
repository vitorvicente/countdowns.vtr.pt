import React from 'react';
import ReactDOM from 'react-dom';
import { FirebaseContext } from 'vtr-react-components/dist/Firebase';
import App from './App';

import Firebase from "./components/Firebase";

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById("root")
);