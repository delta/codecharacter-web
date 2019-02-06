import Register from 'app/containers/Authentication/Register';
import { configureStore } from 'app/store';
import { shallow } from 'enzyme';
import * as React from 'react';

describe('Register Container', () => {
  const { store } = configureStore();
  const wrapper = shallow(<Register handleSelectPanel={Function} />, {
    context: {
      store,
    },
  });

  it('Should render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
