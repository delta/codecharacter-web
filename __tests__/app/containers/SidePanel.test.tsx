import { DashboardActions } from 'app/actions';
// import EditorSettings from 'app/containers/code/EditorSettings'
import SidePanel from 'app/containers/code/SidePanel';
import { SidePanelTab } from 'app/reducers/Dashboard';
import { configureStore } from 'app/store';
import { shallow } from 'enzyme';
import * as React from 'react';

describe('SidePanel Container', () => {
  const store = configureStore();

  it('Should render empty <div/> initially', () => {
    const wrapper = shallow(<SidePanel sidePanelWidth={350} />, {
      context: {
        store,
      },
    });
    expect(wrapper.find('.SidePanel').children()).toHaveLength(0);
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render EditorSettings', () => {
    store.dispatch(DashboardActions.setSidePanelTab(SidePanelTab.EDITOR_SETTINGS));
    const wrapper = shallow(<SidePanel sidePanelWidth={350} />, {
      context: {
        store,
      },
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render empty <div/> after sidePanel toggle off', () => {
    store.dispatch(DashboardActions.setSidePanelTab(SidePanelTab.NONE));
    const wrapper = shallow(<SidePanel sidePanelWidth={350} />, {
      context: {
        store,
      },
    });
    expect(wrapper.find('.SidePanel').children()).toHaveLength(0);
    expect(wrapper).toMatchSnapshot();
  });
});
