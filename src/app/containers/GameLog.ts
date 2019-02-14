import { GameLog } from 'app/components/GameLog';
import { RootState } from 'app/reducers';
import * as GameLogInterfaces from 'app/types/GameLog';
import { connect } from 'react-redux';

const mapStateToProps = (rootState: RootState) => {
  return {
    debugLog: rootState.gameLog.displayDebugLog,
  };
};

const gameLogContainer = connect<GameLogInterfaces.StateProps, {}, {}>(mapStateToProps)(GameLog);

export default gameLogContainer;
