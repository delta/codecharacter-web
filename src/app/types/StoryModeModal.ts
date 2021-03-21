export interface Props {
  description: string;
  isCompleted: boolean;
  level: number;
  stars: number;
  toggleStoryModeModal: (level: number) => void;
  startMatch: (mapId: number, aiId: number) => void;
}
