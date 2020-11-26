import React from 'react';
import ReactDOM from 'react-dom';

import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import App from './App';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import createMockStore from 'redux-mock-store';

Enzyme.configure({ adapter: new Adapter });

describe("test Index component", () => {

    const history = createBrowserHistory()
    const mockStore = createMockStore()
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