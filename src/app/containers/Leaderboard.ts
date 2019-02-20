import { LeaderboardActions } from 'app/actions';
import { Leaderboard } from 'app/components/Leaderboard';
import { RootState } from 'app/reducers';
import * as LeaderboardInterfaces from 'app/types/Leaderboard';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

const mapStateToProps = (rootState: RootState) => {
  return {
    loading: rootState.leaderboard.loading,
    players: rootState.leaderboard.players,
    timerData: rootState.leaderboard.timerData,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    clearLeaderboard: () =>
      dispatch(LeaderboardActions.updateLeaderboard([], LeaderboardActions.updateType.REPLACE)),
    getLeaderboard: (pattern: string, start: number) =>
      dispatch(LeaderboardActions.getLeaderboard(pattern, start)),
    getTimer: () => dispatch(LeaderboardActions.getTimer()),
    runMatch: (opponentId: number) => dispatch(LeaderboardActions.runMatch(opponentId)),
    setTimer: (timerData: number) => dispatch(LeaderboardActions.setTimer(timerData)),
  };
};

const leaderboardContainer = connect<
  LeaderboardInterfaces.StateProps,
  LeaderboardInterfaces.DispatchProps,
  {}
>(
  mapStateToProps,
  mapDispatchToProps,
)(Leaderboard);

export default leaderboardContainer;
