import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store/store';
import './style/style.css'


export const Index = () => {


  return (
    <React.StrictMode>
      <Provider store={store}>
        <Router>
        <App />
        </Router>
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
