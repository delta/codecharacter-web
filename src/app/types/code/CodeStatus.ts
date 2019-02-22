export interface StateProps {
  currentCommitHash: string;
  lastSaveTime: Date;
}

export interface OwnProps {
  width: number;
}

export interface State {
  lastSaveMessage: string;
}

export type Props = OwnProps & StateProps & {};
