import { DashboardActions, EditorActions } from 'app/actions';
import { EditorSettingsModal } from 'app/components/code/EditorSettingsModal';
import { RootState } from 'app/reducers';
import { SidePanelTab } from 'app/reducers/Dashboard';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

const mapStateToProps = (rootState: RootState) => {
  return {
    fontSize: rootState.editor.editorOptions.fontSize,
    sidePanelTab: rootState.dashboard.sidePanelTab,
    theme: rootState.editor.editorOptions.theme,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    changeFontSize: (fontSize: number) => dispatch(EditorActions.changeFontSize(fontSize)),
    changeTheme: (theme: string) => dispatch(EditorActions.changeTheme(theme)),
    closeSidePanelTab: () => dispatch(DashboardActions.setSidePanelTab(SidePanelTab.NONE)),
    openSidePanelTab: () => dispatch(DashboardActions.setSidePanelTab(SidePanelTab.EDITOR_SETTINGS))
  }
}

const editorSettingsModalContainer = connect<
  EditorSettingsModal.StateProps,
  EditorSettingsModal.DispatchProps,
  {}
>(
  mapStateToProps,
  mapDispatchToProps,
)(EditorSettingsModal);

export default editorSettingsModalContainer;
