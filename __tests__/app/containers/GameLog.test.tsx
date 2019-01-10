import GameLog from 'app/containers/code/GameLog';
import { configureStore } from 'app/store';
import { shallow } from 'enzyme';
import * as React from 'react';
// tslint:disable-next-line:import-name
// import AceEditor from 'react-ace';

describe('GameLog Container', () => {
  const store = configureStore();
  const wrapper = shallow(<GameLog />, {
    context: {
      store,
    },
  });
  it('Should render', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should have prop', () => {
    expect(wrapper.props().gameLog).toMatch(store.getState().gameLog.gameLog);
  });
});
