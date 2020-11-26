import React from 'react';
import Friends from '../Friends';

import { configure, shallow, mount} from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { shallowToJson } from 'enzyme-to-json';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

Enzyme.configure({ adapter: new Adapter });


describe("friends component test", () => {
    
    const mockStore = configureMockStore()
    const store = mockStore({})
    const history = createMemoryHistory()
    const shallowComponent = mount(<Provider store={store}><Router history={history}><Friends /></Router></Provider>);

    it("render 1 <Friends /> component", () => {
        
        expect(shallowComponent).toHaveLength(1);
        expect(shallowComponent.text()).toMatch(/Types/);
        
    });



});