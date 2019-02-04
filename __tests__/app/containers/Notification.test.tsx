import Notification from 'app/containers/Notification';
import { configureStore } from 'app/store';
import { shallow } from 'enzyme';
import * as React from 'react';

describe('Notification Container', () => {
  it('Should render Notification', () => {
    const store = configureStore();
    const wrapper = shallow(<Notification />, {
      context: {
        store,
      },
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('Should have props', () => {
    const store = configureStore();
    const wrapper = shallow(<Notification />, {
      context: {
        store,
      },
    });
    expect(wrapper.props().notifications).toEqual(expect.any(Array));
  });
});
