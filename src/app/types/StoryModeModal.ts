export interface Props {
  description: string;
  isCompleted: boolean;
  level: number;
  stars: number;
  closeStoryModeModal: () => void;
  startMatch: (mapId: number, aiId: number) => void;
}
