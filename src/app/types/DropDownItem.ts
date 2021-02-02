export interface ElementOwnProps {
  level: string;
  rating: number;
  openStoryModeModal: (level: number) => void;
}

export type Props = ElementOwnProps;
