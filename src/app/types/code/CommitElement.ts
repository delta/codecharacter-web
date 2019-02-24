import { Commit } from 'app/types/code/Code';
import { Map } from 'app/types/code/Submission';

export interface State {
  imgType: string;
  isHovered: boolean;
  isMapListOpen: boolean;
}

export interface Props {
  index: number;
  commitDetails: Commit;
  commitsLength: number;
  forkCode?: () => void;
  checkoutCode: () => void;
  startMatch: (mapId: number, commitHash: string) => void;
  maps: Map[];
  isCurrentHash: boolean;
}

export interface MapListProps {
  maps: Map[];
  startMatch: (mapId: number) => void;
}
