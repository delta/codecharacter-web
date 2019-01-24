import { RootState } from 'app/reducers';

import { LeaderboardActions } from 'app/actions';
import { Leaderboard } from 'app/components/Leaderboard';
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

const leaderboardContainer = connect<Leaderboard.StateProps, Leaderboard.DispatchProps, {}>(
  mapStateToProps,
  mapDispatchToProps,
)(Leaderboard);

export default leaderboardContainer;
