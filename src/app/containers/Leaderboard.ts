import { LeaderboardActions, SubmissionActions } from 'app/actions';
import { Leaderboard } from 'app/components/Leaderboard';
import { RootState } from 'app/reducers';
import { Request } from 'app/types/code/Submission';
import * as LeaderboardInterfaces from 'app/types/Leaderboard';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

const mapStateToProps = (rootState: RootState) => {
  return {
    isLoggedIn: rootState.user.isLoggedIn,
    loading: rootState.leaderboard.loading,
    players: rootState.leaderboard.players,
    timerData: rootState.leaderboard.timerData,
    username: rootState.user.username,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    clearLeaderboard: () =>
      dispatch(LeaderboardActions.updateLeaderboard([], LeaderboardActions.updateType.REPLACE)),
    getLeaderboard: (pageNo: number, pageSize: number) =>
      dispatch(LeaderboardActions.getLeaderboard(pageNo, pageSize)),
    getLeaderboardByDivAndType: (
      div: LeaderboardInterfaces.DivisionType,
      pageNo: number,
      pageSize: number,
      userType: LeaderboardInterfaces.UserType,
    ) => dispatch(LeaderboardActions.getLeaderboardByDivAndType(div, pageNo, pageSize, userType)),
    getLeaderboardByDivType: (
      pageNo: number,
      pageSize: number,
      div: LeaderboardInterfaces.DivisionType,
    ) => dispatch(LeaderboardActions.getLeaderboardByDiv(div, pageNo, pageSize)),
    getLeaderboardByUserType: (
      pageNo: number,
      pageSize: number,
      userType: LeaderboardInterfaces.UserType,
    ) => dispatch(LeaderboardActions.getLeaderboardByUserType(userType, pageNo, pageSize)),
    getLeaderboardByUsername: (username: string, pageNo: number, pageSize: number) =>
      dispatch(LeaderboardActions.getLeaderboardByUserName(username, pageNo, pageSize)),
    getTimer: () => dispatch(LeaderboardActions.getTimer()),
    runMatch: (opponentId: number) => dispatch(LeaderboardActions.runMatch(opponentId)),
    setTimer: (timerData: number) => dispatch(LeaderboardActions.setTimer(timerData)),
    updatePlayerId2: (playerId2: number) => dispatch(SubmissionActions.updatePlayerId2(playerId2)),
    updateRequest: (request: Request) => dispatch(SubmissionActions.changeCurrentRequest(request)),
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
