export interface DispatchProps {
  sendExecuteError: (error: string) => void;
  sendExecuteSuccess: (logs: string) => void;
  sendCompileError: (error: string) => void;
  sendCompileSuccess: () => void;
  sendDebugRunError: () => void;
  sendDebugRunSuccess: (stackTrace: string) => void;
  sendError: (message: string) => void;
  sendInfo: (message: string) => void;
  sendSuccess: (message: string) => void;
}

export type Props = DispatchProps;
