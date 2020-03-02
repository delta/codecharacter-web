import { NotificationElement } from 'app/components/Notification/NotificationElement';
import { RootState } from 'app/reducers';
import { connect } from 'react-redux';

const mapStateToProps = (rootState: RootState) => {
  return {};
};

const notificationElementContainer = connect<{}, {}, {}>(mapStateToProps, {})(NotificationElement);

export default notificationElementContainer;
