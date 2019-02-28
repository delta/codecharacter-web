import Authentication from 'app/containers/Authentication';
import { configureStore } from 'app/store';
import { shallow } from 'enzyme';
import * as React from 'react';

describe('Authentication main Container', () => {
  const { store } = configureStore();
  const wrapper = shallow(<Authentication setIsAuthenticationOpen={(v: boolean) => undefined} />, {
    context: {
      store,
    },
  });

  it('Should render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
