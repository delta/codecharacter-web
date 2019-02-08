import UserProfileModal from 'app/containers/UserProfileModal';
import { configureStore } from 'app/store';
import { shallow } from 'enzyme';
import * as React from 'react';

describe('UserProfileModal Container', () => {
  const store = configureStore();
  const wrapper = shallow(<UserProfileModal />, {
    context: {
      store,
    },
  });
  it('Should render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
