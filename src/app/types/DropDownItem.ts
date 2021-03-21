export interface ElementOwnProps {
  level: string;
  rating: number;
  toggleStoryModeModal: (level: number) => void;
  setCurrentLevel: (level: number, stars: number) => void;
}

export type Props = ElementOwnProps;
