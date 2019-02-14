export interface OwnProps {
  height: number;
}

export interface StateProps {
  logFile: string;
  player1DebugLog: string;
  player2DebugLog: string;
}

export interface DispatchProps {
  clearLog: () => void;
  updateLog: (log: string) => void;
}

export type Props = OwnProps & DispatchProps & StateProps;
