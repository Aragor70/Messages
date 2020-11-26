import React from 'react';
import Menu from './Menu';

import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import createMockStore from 'redux-mock-store';

Enzyme.configure({ adapter: new Adapter });

describe("menu component test", () => {
    
    const mockStore = createMockStore()
    const history = createBrowserHistory()
    const setMenu = () => jest.fn()
    const logout = () => jest.fn()
    const props = {
        history,
        auth: { isAuthenticated: false }, 
        setMenu, 
        logout
    }

    const mountComponent = mount(
    <Provider store={mockStore()}>
        <Router history={history}>
            <Menu { ...props } />
        </Router>
    </Provider>)
    
    it("render menu component 1 correctly", () => {

        expect(mountComponent).toHaveLength(1);
        expect(mountComponent.find('.menu')).toHaveLength(1)
        
    });


    it("render different options menu when user logged in", () => {
        const loggedIn = { isAuthenticated: true }
        const componentLoggedIn = mount(
        <Provider store={mockStore()}>
            <Router history={history}>
                <Menu history={history} auth={ loggedIn } setMenu={ setMenu } logout={ logout } />
            </Router>
        </Provider>)
        expect(componentLoggedIn.text()).toMatch(/logout/)


    });

});