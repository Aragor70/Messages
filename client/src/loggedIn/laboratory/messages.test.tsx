import React from 'react';
import Messages from '../Messages';

import { configure, shallow, mount} from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { shallowToJson } from 'enzyme-to-json';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import createMockStore from 'redux-mock-store';
import { createBrowserHistory } from 'history';


describe("component <Messages /> test", () => {
    const mockStore = createMockStore()
    const history = createBrowserHistory()
    const mountComponent = mount(<Provider store={mockStore({})}><Router history={history}><Messages /></Router></Provider>);


    it("render Messages component 1 without issues", () => {
        expect(mountComponent).toHaveLength(1);
        expect(mountComponent.find('.messages-content')).toHaveLength(1)
    });


});