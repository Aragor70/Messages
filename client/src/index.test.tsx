import React from 'react';
import ReactDOM from 'react-dom';

import { mount } from 'enzyme';
import App from './App';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import createMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';


describe("test Index component", () => {

    const history = createBrowserHistory()
    const middlewares = [thunk]
    const mockStore = createMockStore(middlewares)
    let component: any;

    beforeEach(() => {
        component = mount(<Provider store={mockStore({ auth: {isAuthenticated: false}, alert: {alerts: null } })}>
            <Router history={history}>
                <App />
            </Router>
        </Provider>);
    });
    
    it("component renders one dom element", () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <Provider store={mockStore({ auth: {isAuthenticated: false}, alert: {alerts: null } })}>
                <Router history={history}>
                    <App />
                </Router>
            </Provider>
        , div);
        ReactDOM.unmountComponentAtNode(div)
        
        
    });
    it("compoent render jsx tags correctly", () => {
        
        expect(component.find('.output')).toHaveLength(1);
    });
});