import React from 'react';
import App from './App';

import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import createMockStore from 'redux-mock-store';

Enzyme.configure({ adapter: new Adapter });

describe("App component test", () => {
    const mockStore = createMockStore()
    const history = createBrowserHistory()
    const loadUser = jest.fn()
    const login = jest.fn()
    const props = {
        loadUser, 
        auth: { isAuthenticated: false }
    }

    const mountComponent = mount(
    <Provider store={mockStore({ auth: { isAuthenticated: false }, alert: { alerts: null } })}>
        <Router history={history}>
            <App { ...props } />
        </Router>
    </Provider>)

    it("render App 1 component correctly", () => {
        expect(mountComponent).toHaveLength(1)
        expect(mountComponent.find('.header')).toHaveLength(1)
        expect(mountComponent.find('.output')).toHaveLength(1)
        expect(mountComponent.find('.header')).toHaveLength(1)

    });


});