import { GameLogActions } from 'app/actions';
import { GameLog } from 'app/components/GameLog';
import { RootState } from 'app/reducers';
import * as GameLogInterfaces from 'app/types/GameLog';
import { connect } from 'react-redux';

const mapStateToProps = (rootState: RootState) => {
  return {
    gameLog: rootState.gameLog.gameLog,
    player1DebugLog: rootState.gameLog.player1DebugLog,
    player2DebugLog: rootState.gameLog.player2DebugLog,
  };
};

const gameLogContainer = connect<GameLogInterfaces.StateProps, GameLogInterfaces.DispatchProps, {}>(
  mapStateToProps,
  {
    updateGameLog: GameLogActions.updateGameLog,
  },
)(GameLog);

export default gameLogContainer;
