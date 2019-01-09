import { GameLogActions } from 'app/actions';
import { GameLog } from 'app/components/code/GameLog';
import { RootState } from 'app/reducers';
import { connect } from 'react-redux';

const mapStateToProps = (rootState: RootState) => {
  return {
    gameLog: rootState.log.gameLog,
  };
};

const gameLogContainer = connect<GameLog.StateProps, GameLog.DispatchProps, {}>(
  mapStateToProps,
  {
    updateGameLog: GameLogActions.updateGameLog,
  },
)(GameLog);

export default gameLogContainer;
