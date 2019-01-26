import { CodeActions } from 'app/actions';
import { SubmitBar } from 'app/components/SubmitBar';
import { RootState } from 'app/reducers';
import * as SubmitBarInterfaces from 'app/types/SubmitBar';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

const mapStateToProps = (rootState: RootState) => {
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    commitCode: (commitMessage: string) => dispatch(CodeActions.commit(commitMessage)),
    saveCode: () => dispatch(CodeActions.save()),
  };
};

const submitBarContainer = connect<{}, SubmitBarInterfaces.DispatchProps, {}>(
  mapStateToProps,
  mapDispatchToProps,
)(SubmitBar);

export default submitBarContainer;
