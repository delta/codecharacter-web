export interface OwnProps {
  height: number;
}

export interface State {
  hasError: boolean;
}

export interface StateProps {
  logFile: string;
  player1DebugLog: string;
  player2DebugLog: string;
  matchPlayerId: number;
}

export interface DispatchProps {
  clearLog: () => void;
  updateLog: (log: string) => void;
}

export type Props = OwnProps & DispatchProps & StateProps;
