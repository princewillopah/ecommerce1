import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom'
// import './index.css';
import App from './App';
import 'antd/dist/antd.css'

import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import rootReducer from './store/reducers'

//check if there is userInfo in local storage// if there is, store its values in userInfoFromLocalStorage
const userInfoFromLocalStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null//get the json formatted dtuff from the storage
// initialize the userState value "userInfo" with the values userInfoFromLocalStorage
const initialState = {
  userState: {userInfo: userInfoFromLocalStorage}
}
const store = createStore(rootReducer,initialState,composeWithDevTools());



ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <Router>
      <App />
    </Router>
   </Provider>,
  // </React.StrictMode>,
  document.getElementById('root')
);
