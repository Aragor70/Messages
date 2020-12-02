import React from 'react';
import NoMatch from './NoMatch';

import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import createMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

Enzyme.configure({ adapter: new Adapter });

describe("404 component test", () => {
    const middlewares = [thunk]
    const mockStore = createMockStore(middlewares)
    const history = createBrowserHistory()

    const setAlert = jest.fn()

    const props = {
        auth: { isAuthenticated: false},
        setAlert: setAlert,

    }
    const shallowComponent = mount(
        <Provider store={mockStore({ auth: {isAuthenticated: false} })}>
            <Router history={history}>
                <NoMatch auth={props.auth} />
            </Router>
        </Provider>
    )
    
    it("render comnponent 1 correctly", () => {
        expect(shallowComponent).toHaveLength(1)
        
    });

    it("render component on specyfic pathnames locations", () => {
        
        expect(shallowComponent.find('.page-not-found')).toHaveLength(1)

    });

});