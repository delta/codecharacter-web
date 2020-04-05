import { CodeActions } from 'app/actions';
import { CodeStatus } from 'app/components/code/CodeStatus';
import { RootState } from 'app/reducers';
import * as CodeStatusInterfaces from 'app/types/code/CodeStatus';
import { RequestState } from 'app/types/code/Submission';
import { connect } from 'react-redux';

const mapStateToProps = (rootState: RootState) => {
  let currentState = '';
  switch (rootState.submission.state) {
    case RequestState.IDLE: {
      currentState = 'Idle';
      break;
    }
    case RequestState.EXECUTE_SELF_MATCH: {
      currentState = 'Executing Self Match';
      break;
    }
    case RequestState.EXECUTE_PREVIOUS_COMMIT_MATCH: {
      currentState = 'Executing previous commit match';
      break;
    }
    case RequestState.EXECUTE_AI_MATCH: {
      currentState = 'Executing AI match';
      break;
    }
    case RequestState.COMPILE_PREVIOUS_COMMIT_CODE: {
      currentState = 'Compiling previous commit code';
      break;
    }
    case RequestState.COMPILE_CURRENT_CODE: {
      currentState = 'Compiling latest code';
      break;
    }
    case RequestState.DEBUG_RUN: {
      currentState = 'Running code in debug mode';
      break;
    }
  }

  return {
    currentState,
    currentCommitHash: rootState.code.currentCommitHash,
    isCodeSaved: rootState.code.isCodeSaved,
    lastSaveTime: rootState.code.lastSaveTime,
  };
};

const codeStatusContainer = connect<
  CodeStatusInterfaces.StateProps,
  CodeStatusInterfaces.DispatchProps,
  CodeStatusInterfaces.OwnProps
>(mapStateToProps, {
  commit: CodeActions.commit,
  getCommitLog: CodeActions.getCommitLog,
})(CodeStatus);

export default codeStatusContainer;
