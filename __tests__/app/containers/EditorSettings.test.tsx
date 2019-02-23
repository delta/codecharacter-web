import EditorSettings from 'app/containers/code/EditorSettings';
import { configureStore } from 'app/store';
import { mount } from 'enzyme';
import * as React from 'react';

describe('EditorSettings Container', () => {
  const { store } = configureStore();

  it('Should render EditorSettings', () => {
    const wrapper = mount(<EditorSettings />, {
      context: {
        store,
      },
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('Should change font', () => {
    const wrapper = mount(<EditorSettings />, {
      context: {
        store,
      },
    });

    expect(wrapper.find('select.font-size-control').props().value).toBe(16);
    wrapper.find('select.font-size-control').simulate('change', { target: { value: '32' } });
    expect(wrapper.find('select.font-size-control').props().value).toBe(32);
  });

  it('Should change theme', () => {
    const wrapper = mount(<EditorSettings />, {
      context: {
        store,
      },
    });

    expect(wrapper.find('select.theme-control').props().value).toBe('twilight');
    wrapper.find('select.theme-control').simulate('change', { target: { value: 'github' } });
    expect(wrapper.find('select.theme-control').props().value).toBe('github');
  });

  it('Should enable autoComplete', () => {
    const wrapper = mount(<EditorSettings />, {
      context: {
        store,
      },
    });

    expect(wrapper.find('select.auto-complete-control').props().value).toBe('disabled');
    wrapper
      .find('select.auto-complete-control')
      .simulate('change', { target: { value: 'enabled' } });
    expect(wrapper.find('select.auto-complete-control').props().value).toBe('enabled');
  });

  it('Should enable snippets', () => {
    const wrapper = mount(<EditorSettings />, {
      context: {
        store,
      },
    });

    expect(wrapper.find('select.snippets-control').props().value).toBe('disabled');
    wrapper.find('select.snippets-control').simulate('change', { target: { value: 'enabled' } });
    expect(wrapper.find('select.snippets-control').props().value).toBe('enabled');
  });
});
