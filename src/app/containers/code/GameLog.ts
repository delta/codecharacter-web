import { GameLogActions } from 'app/actions';
import { GameLog } from 'app/components/code/GameLog';
import { RootState } from 'app/reducers';
import * as GameLogInterfaces from 'app/types/GameLog';
import { connect } from 'react-redux';

const mapStateToProps = (rootState: RootState) => {
  return {
    value: rootState.gameLog.value,
  };
};

const gameLogContainer = connect<GameLogInterfaces.StateProps, GameLogInterfaces.DispatchProps, {}>(
  mapStateToProps,
  {
    updateGameLog: GameLogActions.updateGameLog,
  },
)(GameLog);

export default gameLogContainer;
