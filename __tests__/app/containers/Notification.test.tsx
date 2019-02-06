import Notification from 'app/containers/Notification';
import { configureStore } from 'app/store';
import { shallow } from 'enzyme';
import * as React from 'react';

describe('Notification Container', () => {
  const { store } = configureStore();

  it('Should render Notification', () => {
    const wrapper = shallow(<Notification />, {
      context: {
        store,
      },
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('Should have props', () => {
    const wrapper = shallow(<Notification />, {
      context: {
        store,
      },
    });
    expect(wrapper.props().notifications).toEqual(expect.any(Array));
  });
});
