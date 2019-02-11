import { Sidebar } from 'app/components/SideBar';
// tslint:disable-next-line:import-name
import SidebarContainer from 'app/containers/SideBar';
import { SidePanelTab } from 'app/reducers/Dashboard';
import { configureStore } from 'app/store';
import { mount } from 'enzyme';
import * as React from 'react';

describe('SideBar Container', () => {
  const { store } = configureStore();
  const wrapper = mount(<SidebarContainer toggleJoyRide={Function} />, {
    context: {
      store,
    },
  });

  it('Should render', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Should Dispatch setSidePanelTab EditorSettings or None', () => {
    const button = wrapper.find('.editor-settings-btn-ctrl').at(1);
    button.simulate('click');
    expect(wrapper.find(Sidebar).props().sidePanelTab).toBe(SidePanelTab.EDITOR_SETTINGS);
    button.simulate('click');
    expect(wrapper.find(Sidebar).props().sidePanelTab).toBe(SidePanelTab.NONE);
  });

  it('Should Dispatch setSidePanelTab Leaderboard or None', () => {
    const button = wrapper.find('.leaderboard-btn-ctrl').at(1);
    button.simulate('click');
    expect(wrapper.find(Sidebar).props().sidePanelTab).toBe(SidePanelTab.LEADERBOARD);
    button.simulate('click');
    expect(wrapper.find(Sidebar).props().sidePanelTab).toBe(SidePanelTab.NONE);
  });

  it('Should Dispatch setSidePanelTab Match or None', () => {
    const button = wrapper.find('.match-btn-ctrl').at(1);
    button.simulate('click');
    expect(wrapper.find(Sidebar).props().sidePanelTab).toBe(SidePanelTab.MATCH);
    button.simulate('click');
    expect(wrapper.find(Sidebar).props().sidePanelTab).toBe(SidePanelTab.NONE);
  });

  it('Should Dispatch setSidePanelTab Notification or None', () => {
    const button = wrapper.find('.notification-btn-ctrl').at(1);
    button.simulate('click');
    expect(wrapper.find(Sidebar).props().sidePanelTab).toBe(SidePanelTab.NOTIFICATION);
    button.simulate('click');
    expect(wrapper.find(Sidebar).props().sidePanelTab).toBe(SidePanelTab.NONE);
  });

  it('Should Dispatch setSidePanelTab CommitLog or None', () => {
    const button = wrapper.find('.commitLog-btn-ctrl').at(1);
    button.simulate('click');
    expect(wrapper.find(Sidebar).props().sidePanelTab).toBe(SidePanelTab.COMMIT_LOG);
    button.simulate('click');
    expect(wrapper.find(Sidebar).props().sidePanelTab).toBe(SidePanelTab.NONE);
  });
});
