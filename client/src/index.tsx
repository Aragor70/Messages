import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { loadUser } from './store/actions/auth/auth';
import store from './store/store';
import './style/style.css'
import setAuthToken from './utils/setAuthToken';


export const Index = () => {


  /* useEffect(():any => {
    if (localStorage.token) {
      setAuthToken(localStorage.token)
      return store.dispatch(loadUser());
    }
  }, []) */


  return (
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  )
}
ReactDOM.render(<Index /> ,document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
