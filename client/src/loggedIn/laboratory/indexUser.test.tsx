import React from 'react';
import IndexUser from '../IndexUser';

import { configure, shallow, mount} from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';


describe("indexUser component test", () => {
    
    const mockStore = configureMockStore()
    const store = mockStore({
        auth: {
            user: {
                name: 'Bambino',
                email: 'bambino@gmail.com',
                password: 'password123',
                avatar: 'avatar',
                role: 'User',
                two_factor: false,
                status: 'Online'
            }
        }
    })

    const history = createMemoryHistory()


    const shallowComponent = mount(<Provider store={store}><Router history={history}><IndexUser /></Router></Provider>);


    it("render 1 <IndexUser /> component", () => {
        
        
        expect(shallowComponent).toHaveLength(1)
        expect(shallowComponent.find('.messages-content')).toHaveLength(1)
        
    });






});