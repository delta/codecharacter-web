import GameLog from 'app/containers/GameLog';
import { configureStore } from 'app/store';
import { shallow } from 'enzyme';
import * as React from 'react';

describe('GameLog Container', () => {
  const { store } = configureStore();
  const wrapper = shallow(<GameLog height={100} />, {
    context: {
      store,
    },
  });

  it('Should render', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have prop', () => {
    expect(wrapper.props().debugLog).toMatch(store.getState().gameLog.displayDebugLog);
  });
});
