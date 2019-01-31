import Editor from 'app/containers/code/Editor';
import { configureStore } from 'app/store';
import { shallow } from 'enzyme';
import * as React from 'react';

describe('Editor Container', () => {
  it('Should render Editor', () => {
    const store = configureStore();
    const wrapper = shallow(<Editor editorWidth={400} />, {
      context: {
        store,
      },
    });
    expect(wrapper).toMatchSnapshot();
  });
  it('Should have props', () => {
    const store = configureStore();
    const wrapper = shallow(<Editor editorWidth={400} />, {
      context: {
        store,
      },
    });
    expect(wrapper.props().editorWidth).toEqual(400);
    expect(wrapper.props().code).toEqual(expect.any(String));
    expect(wrapper.props()).toEqual(expect.objectContaining(store.getState().editor.editorOptions));
  });
});
