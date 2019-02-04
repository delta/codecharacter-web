export interface StateProps {
  currentCommitHash: string;
}

export interface OwnProps {
  width: number;
}

export type Props = OwnProps & StateProps & {};
