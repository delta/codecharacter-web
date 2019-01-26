export interface DispatchProps {
  saveCode: () => void;
  commitCode: (commitMessage: string) => void;
}

export type Props = {} & DispatchProps;
