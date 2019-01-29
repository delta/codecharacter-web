import Register from 'app/containers/Authentication/Register';
import { configureStore } from 'app/store';
import { shallow } from 'enzyme';
import * as React from 'react';

describe('Register Container', () => {
  const store = configureStore();
  // tslint:disable-next-line:no-console
  console.log(<Register handleSelectPanel={Function} />);
  const wrapper = shallow(<Register handleSelectPanel={Function} />, {
    context: {
      store,
    },
  });

  it('Should render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
