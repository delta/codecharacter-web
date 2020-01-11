import { GameLogActions } from 'app/actions';
import Renderer from 'app/components/Renderer';
import { RootState } from 'app/reducers';
import * as RendererInterfaces from 'app/types/Renderer';
import { connect } from 'react-redux';

const mapStateToProps = (rootState: RootState) => {
  return {
    logFile: rootState.gameLog.gameLog,
    matchPlayerId: rootState.gameLog.matchPlayerId,
    player1DebugLog: rootState.gameLog.player1DebugLog,
    player2DebugLog: rootState.gameLog.player2DebugLog,
  };
};

const rendererContainer = connect<
  RendererInterfaces.StateProps,
  RendererInterfaces.DispatchProps,
  {}
>(mapStateToProps, {
  clearLog: GameLogActions.clearDisplayDebugLog,
  updateLog: GameLogActions.updateDisplayDebugLog,
})(Renderer);

export default rendererContainer;
