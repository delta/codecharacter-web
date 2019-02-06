import CodeStatus from 'app/containers/code/CodeStatus';
import { configureStore } from 'app/store';
import { shallow } from 'enzyme';
import * as React from 'react';

describe('CodeStatus Container', () => {
  const { store } = configureStore();
  const wrapper = shallow(<CodeStatus width={250} />, {
    context: {
      store,
    },
  });

  it('Should render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
