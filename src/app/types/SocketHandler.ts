export interface DispatchProps {
  sendError: (message: string) => void;
  sendInfo: (message: string) => void;
  sendSuccess: (message: string) => void;
}

export type Props = DispatchProps;
