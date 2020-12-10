import React from 'react';
import Menu from './Menu';

import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import createMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';


describe("menu component test", () => {
    const middlewares = [thunk]
    const mockStore = createMockStore(middlewares)
    const history = createBrowserHistory()
    const setMenu = jest.fn()
    const logout = jest.fn()
    const props = {
        history,
        auth: { isAuthenticated: false }, 
        setMenu, 
        logout
    }

    const mountComponent = mount(
    <Provider store={mockStore({})}>
        <Router history={history}>
            <Menu { ...props } />
        </Router>
    </Provider>)
    
    it("render menu component 1 correctly", () => {

        expect(mountComponent).toHaveLength(1);
        expect(mountComponent.find('.menu')).toHaveLength(1)
    });

    it("setProps user logged in correctly", () => {
        mountComponent.setProps({ auth: { isAuthenticated: true } })
        //console.log(mountComponent.props())
    });

    it("render different options menu when user logged in", () => {
        const loggedIn = { isAuthenticated: true }
        const componentLoggedIn = mount(
        <Provider store={mockStore({ })}>
            <Router history={history}>
                <Menu history={history} auth={ loggedIn } setMenu={ setMenu } logout={ logout } />
            </Router>
        </Provider>)
        
        
        expect(componentLoggedIn.text()).toMatch(/logout/)


    });

});