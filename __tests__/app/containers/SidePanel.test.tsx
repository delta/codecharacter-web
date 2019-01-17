import { DashboardActions } from 'app/actions';
import SidePanel from 'app/containers/code/SidePanel';
import { SidePanelTab } from 'app/reducers/Dashboard';
import { configureStore } from 'app/store';
import { mount } from 'enzyme';
import * as React from 'react';
// import { RootState } from 'app/reducers';

describe ('SidePanel Container', () => {
  const store = configureStore();

  it ('Should render empty <div/> initially', () => {
    const wrapper = mount(<SidePanel
      onShowSidePanel={Function}
      onHideSidePanel={Function}
    />, {
          context: {
            store,
          }
      });
      expect(wrapper.find('.SidePanel').children()).toHaveLength(0)
  });

  it('Should render', () => {
      store.dispatch(DashboardActions.setSidePanelTab(SidePanelTab.EDITOR_SETTINGS))
      const wrapper = mount(<SidePanel
        onShowSidePanel={Function}
        onHideSidePanel={Function}
      />, {
            context: {
                store,
            }
        });
        expect(wrapper).toMatchSnapshot();
    });

    it('Should change font', () => {
      const wrapper = mount(<SidePanel
        onShowSidePanel={Function}
        onHideSidePanel={Function}/>, {
            context: {
                store,
            }
        });

        expect(wrapper.find('select.font-size-control').props().value).toBe(16);
        wrapper.find('select.font-size-control').simulate('change', { target: { value: '32' } });
        expect(wrapper.find('select.font-size-control').props().value).toBe(32);
    });

    it('Should change theme', () => {
      const wrapper = mount(<SidePanel
        onShowSidePanel={Function}
        onHideSidePanel={Function}/>, {
            context: {
                store,
            }
        });

        expect(wrapper.find('select.theme-control').props().value).toBe('monokai');
        wrapper.find('select.theme-control').simulate('change', { target: { value: 'github' } });
        expect(wrapper.find('select.theme-control').props().value).toBe('github');
    });


  it('Should render empty <div/> after sidePanel toggle off', () => {
    store.dispatch(DashboardActions.setSidePanelTab(SidePanelTab.NONE))
      const wrapper = mount(<SidePanel
        onShowSidePanel={Function}
        onHideSidePanel={Function}
      />, {
            context: {
              store,
            }
        });
        expect(wrapper.find('.SidePanel').children()).toHaveLength(0)
    });

});
