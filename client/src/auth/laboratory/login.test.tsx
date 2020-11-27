import React from 'react';
import Login from '../login';

import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import createMockStore from 'redux-mock-store';

Enzyme.configure({ adapter: new Adapter });

describe("login component test", () => {
    const mockStore = createMockStore()
    const history = createBrowserHistory()
    const setAlert = () => jest.fn()
    const login = () => jest.fn()
    const props = {
        login, 
        history, 
        setAlert
    }

    const mountComponent = mount(
    <Provider store={mockStore()}>
        <Router history={history}>
            <Login { ...props } />
        </Router>
    </Provider>)

    it("render 1 login component correctly", () => {
        expect(mountComponent).toHaveLength(1) 
        expect(mountComponent.text()).toMatch(/Log in/)
        expect(mountComponent.find('.auth-form')).toHaveLength(1)
        const mockLogin = mountComponent.props().children.props.children.login
        

    });



});