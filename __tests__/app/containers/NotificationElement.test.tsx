import NotificationElement from 'app/containers/Notification/NotificationElement';
import { configureStore } from 'app/store';
import * as NotificationInterfaces from 'app/types/Notification';
import { shallow } from 'enzyme';
import * as React from 'react';

describe('Notification Container', () => {
  const props = {
    id: 1,
    text: 'You have moved up a postion in leaderboard',
    title: 'Info!',
    type: NotificationInterfaces.NotificationType.INFO,
  };
  it('Should render Notification', () => {
    const store = configureStore();
    const wrapper = shallow(<NotificationElement {...props} />, {
      context: {
        store,
      },
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('Should have props', () => {
    const store = configureStore();
    const wrapper = shallow(<NotificationElement {...props} />, {
      context: {
        store,
      },
    });
    expect(wrapper.props().id).toEqual(props.id);
    expect(wrapper.props().text).toEqual(props.text);
    expect(wrapper.props().title).toEqual(props.title);
    expect(wrapper.props().type).toEqual(props.type);
  });
});
