import { GameLogActions } from 'app/actions/GameLog';
import { ActionType } from 'typesafe-actions';

export interface StateProps {
  value: string;
}

export interface DispatchProps {
  updateGameLog: (gameLog: string) => void;
}

export type Props = StateProps & DispatchProps;

const actions = {
  updateGameLog: GameLogActions.updateGameLog,
};

export interface GameLogStoreState {
  value: string;
}

export type GameLogStoreAction = ActionType<typeof actions>;
