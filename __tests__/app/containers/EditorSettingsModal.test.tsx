import EditorSettingsModal from 'app/containers/code/EditorSettingsModal';
import { configureStore } from 'app/store';
import { mount } from 'enzyme';
import * as React from 'react';
// import { RootState } from 'app/reducers';

describe ('EditorSettingsModal Container', () => {
    const store = configureStore();

    it ('Should render', () => {
        const wrapper = mount(<EditorSettingsModal/>, {
            context: {
                store,
            }
        });
        expect(wrapper).toMatchSnapshot();
    });

    it('Should change font', () => {
        const wrapper = mount(<EditorSettingsModal />, {
            context: {
                store,
            }
        });

        expect(wrapper.find('select.font-size-control').props().value).toBe(16);
        wrapper.find('select.font-size-control').simulate('change', { target: { value: '32' } });
        expect(wrapper.find('select.font-size-control').props().value).toBe(32);
    });

    it('Should change theme', () => {
        const wrapper = mount(<EditorSettingsModal />, {
            context: {
                store,
            }
        });

        expect(wrapper.find('select.theme-control').props().value).toBe('monokai');
        wrapper.find('select.theme-control').simulate('change', { target: { value: 'github' } });
        expect(wrapper.find('select.theme-control').props().value).toBe('github');
    });
});
