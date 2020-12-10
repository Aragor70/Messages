import React from 'react';
import Friends from '../friends/Friends';

import { configure, shallow, mount} from 'enzyme';

import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { shallowToJson } from 'enzyme-to-json';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';



describe("friends component test", () => {
    
    const mockStore = configureMockStore()
    const store = mockStore({})
    const history = createMemoryHistory()
    const shallowComponent = mount(<Provider store={store}><Router history={history}><Friends /></Router></Provider>);

    it("render 1 <Friends /> component", () => {
        
        expect(shallowComponent).toHaveLength(1);
        expect(shallowComponent.text()).toMatch(/friends/);
        
    });
    
    


});