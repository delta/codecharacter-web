import { RootState } from 'app/reducers';

import { MatchActions } from 'app/actions';
import { Match } from 'app/components/MatchView';
import * as MatchInterfaces from 'app/types/MatchView';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

const mapStateToProps = (rootState: RootState) => {
  return {
    currentUsername: rootState.user.username,
    loading: rootState.match.loading,
    matches: rootState.match.matches,
    topMatches: rootState.match.topMatches,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getGameLogs: (gameId: number) => dispatch(MatchActions.getGameLogs(gameId)),
    getMatches: (pageNo: number, pageSize: number) =>
      dispatch(MatchActions.getMatches(pageNo, pageSize)),
    getTopMatches: (pageNo: number, pageSize: number) =>
      dispatch(MatchActions.getTopMatches(pageNo, pageSize)),
  };
};

const matchContainer = connect<MatchInterfaces.StateProps, MatchInterfaces.DispatchProps, {}>(
  mapStateToProps,
  mapDispatchToProps,
)(Match);

export default matchContainer;
