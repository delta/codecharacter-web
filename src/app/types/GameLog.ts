import { GameLogActions } from 'app/actions/GameLog';
import { ActionType } from 'typesafe-actions';

export interface StateProps {
  gameLog: string;
  player1DebugLog: string;
  player2DebugLog: string;
}

export interface DispatchProps {
  updateGameLog: (player1DebugLog: string, player2DebugLog: string, gameLog: string) => void;
}

export type Props = StateProps & DispatchProps;

const actions = {
  updateGameLog: GameLogActions.updateGameLog,
};

export interface GameLogStoreState {
  gameLog: string;
  player1DebugLog: string;
  player2DebugLog: string;
}

export type GameLogStoreAction = ActionType<typeof actions>;
