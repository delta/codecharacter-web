import { SubmissionActions } from 'app/actions';
import { MapList } from 'app/components/code/CommitLog/MapList';
import { RootState } from 'app/reducers';
import { Map, Request } from 'app/types/code/Submission';
import { connect } from 'react-redux';

export interface State {
  imgType: string;
  isHovered: boolean;
  isMapListOpen: boolean;
}

export interface DispatchProps {
  updateRequest: (request: Request) => void;
  updateMapId: (mapId: number) => void;
  updateCommitHash: (commitHash: string) => void;
}

export interface MapListProps {
  maps: Map[];
  startMatch: (mapId: number) => void;
  commitHash: string;
}

export type Props = MapListProps & DispatchProps;

const mapStateToProps = (rootState: RootState) => {
  return {};
};

const mapListContainer = connect<{}, DispatchProps, {}>(mapStateToProps, {
  updateCommitHash: SubmissionActions.updateCommitHash,
  updateMapId: SubmissionActions.updateMapId,
  updateRequest: SubmissionActions.changeCurrentRequest,
})(MapList);

export default mapListContainer;
