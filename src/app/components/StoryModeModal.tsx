import { faArrowRight, faStar, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'app/styles/StoryModeModal.css';
import * as StoryModalPropType from 'app/types/StoryModeModal';
import * as React from 'react';
import { Button, Modal } from 'react-bootstrap';

export class StoryModeModal extends React.Component<StoryModalPropType.Props, {}> {
  public render() {
    const { description, level, stars, toggleStoryModeModal, startMatch, isCompleted } = this.props;
    return (
      <Modal.Dialog
        className="story-modal"
        style={{
          zIndex: 100,
        }}
      >
        <Modal.Header>
          <Modal.Title>
            <div style={{ margin: 0 }}>
              <b>Level {level}</b>
              {[...Array(stars >= 0 ? stars : 0)].map(() => (
                <FontAwesomeIcon icon={faStar} style={{ color: 'gold' }} />
              ))}
            </div>
          </Modal.Title>
          <button
            style={{ border: 0, padding: 0, margin: 0, backgroundColor: 'white' }}
            onClick={() => toggleStoryModeModal(level)}
          >
            <FontAwesomeIcon icon={faTimes} style={{ float: 'right', cursor: 'pointer' }} />
          </button>
        </Modal.Header>
        <Modal.Body>
          <div dangerouslySetInnerHTML={{ __html: description }}></div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className={isCompleted ? 'btn-success' : 'btn-primary'}
            onClick={() => startMatch(1, level)}
          >
            {isCompleted ? 'Retry' : 'Start'} &nbsp;
            <FontAwesomeIcon icon={faArrowRight} />
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    );
  }
}
