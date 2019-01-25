import { RootState } from 'app/reducers';

import { LeaderboardActions } from 'app/actions';
import { Leaderboard } from 'app/components/Leaderboard';
import * as LeaderboardInterfaces from 'app/types/Leaderboard';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

const mapStateToProps = (rootState: RootState) => {
  return {
    players: rootState.leaderboard.players,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getPlayersData: () => dispatch(LeaderboardActions.getPlayersData()),
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
