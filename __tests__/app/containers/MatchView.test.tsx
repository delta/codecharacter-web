import MatchView from 'app/containers/MatchView';
import { configureStore } from 'app/store';
import { mount } from 'enzyme';
import * as React from 'react';

describe('MatchView Container', () => {
  const { store } = configureStore();
  const wrapper = mount(<MatchView />, {
    context: {
      store,
    },
  });

  it('Should render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
