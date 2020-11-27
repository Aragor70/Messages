import React from 'react';
import Register from '../register';

import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import createMockStore from 'redux-mock-store';

Enzyme.configure({ adapter: new Adapter });

describe("register component test", () => {
    const mockStore = createMockStore()
    const history = createBrowserHistory()
    const register = () => jest.fn()
    const props = {
        register, 
        history
    }

    const mountComponent = mount(
    <Provider store={mockStore()}>
        <Router history={history}>
            <Register { ...props } />
        </Router>
    </Provider>)

    it("render 1 login component correctly", () => {
        expect(mountComponent).toHaveLength(1) 
        expect(mountComponent.text()).toMatch(/Sign up/)
        expect(mountComponent.find('.auth-form')).toHaveLength(1)
        

    });



});