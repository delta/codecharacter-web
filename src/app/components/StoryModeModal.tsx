import { faArrowRight, faStar, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as StoryModalPropType from 'app/types/StoryModeModal';
import * as React from 'react';
import { Button, Modal } from 'react-bootstrap';

export class StoryModeModal extends React.Component<StoryModalPropType.Props, {}> {
  public render() {
    return (
      <Modal.Dialog
        style={{
          marginTop: '10%',
          zIndex: 10,
        }}
      >
        <Modal.Header>
          <Modal.Title>
            <div style={{ margin: 0 }}>
              <b>Level {this.props.level} !! </b>
              {[...Array(this.props.stars >= 0 ? this.props.stars : 0)].map(() => (
                <FontAwesomeIcon icon={faStar} style={{ color: 'gold' }} />
              ))}
            </div>
          </Modal.Title>
          <button
            style={{ border: 0, padding: 0, margin: 0, backgroundColor: 'white' }}
            onClick={() => this.props.toggleStoryModeModal(this.props.level)}
          >
            <FontAwesomeIcon icon={faTimes} style={{ float: 'right', cursor: 'pointer' }} />
          </button>
        </Modal.Header>
        <Modal.Body>{this.props.description}</Modal.Body>
        <Modal.Footer>
          <Button
            className={this.props.isCompleted ? 'btn-success' : 'btn-primary'}
            onClick={() => this.props.startMatch(1, this.props.level)}
          >
            {this.props.isCompleted ? 'Retry' : 'Start'} &nbsp;
            <FontAwesomeIcon icon={faArrowRight} />
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    );
  }
}
