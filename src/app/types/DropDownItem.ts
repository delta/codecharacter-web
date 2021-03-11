export interface ElementOwnProps {
  level: string;
  rating: number;
  openStoryModeModal: (level: number) => void;
  setCurrentLevel: (level: number, stars: number) => void;
}

export type Props = ElementOwnProps;
