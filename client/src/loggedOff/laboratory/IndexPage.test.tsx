import React from 'react';
import IndexPage from '../IndexPage';

import { configure, shallow, mount } from 'enzyme';
import { Route, Router, Switch } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';


describe("component IndexPage test", () => {
    const mockStore = createMockStore()
    const history = createMemoryHistory()
    let mountComponent: any;
    
    beforeEach(() => {
        mountComponent = mount(<Provider store={mockStore({})}><Router history={history}><IndexPage /></Router></Provider>);

    });
    
    it("render IndexPage correctly", () => {
        expect(mountComponent).toHaveLength(1);
        expect(mountComponent.find('.shield')).toHaveLength(1)
    });

    it("click on the link to change the path correctly", () => {
        const button = mountComponent.find('a').first();

        button.simulate("click", {button: 0});

        expect(history.location.pathname).toEqual('/sign-in');
        
    });

});