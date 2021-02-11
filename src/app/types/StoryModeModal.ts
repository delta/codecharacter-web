export interface Props {
  isCompleted: boolean;
  level: number;
  stars: number;
  closeStoryModeModal: () => void;
  startMatch: (mapId: number, aiId: number) => void;
}
