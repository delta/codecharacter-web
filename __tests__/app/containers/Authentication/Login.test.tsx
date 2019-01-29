import Login from 'app/containers/Authentication/Login';
import { configureStore } from 'app/store';
import { mount } from 'enzyme';
import * as React from 'react';

describe('Login Container', () => {
  const store = configureStore();
  // tslint:disable-next-line:no-console
  console.log(<Login handleSelectPanel={Function} />);
  const wrapper = mount(<Login handleSelectPanel={Function} />, {
    context: {
      store,
    },
  });

  it('Should render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
