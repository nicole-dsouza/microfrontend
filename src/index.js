import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

console.log("src/index")

window.rendercreatereactapp = (containerId, history, data) => {
  let userData = JSON.parse(localStorage.getItem('userData'))
  ReactDOM.hydrate(<App history={history} data={data} user={userData}/>, document.getElementById(containerId));
}

// unmount micro frontend function
window.unmountcreatereactapp = containerId => {
  ReactDOM.unmountComponentAtNode(document.getElementById(containerId));
};

// Mount to root if it is not a micro frontend
if (!document.getElementById('createreactapp-container')) {
  ReactDOM.render(<App />, document.getElementById('root'));
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();