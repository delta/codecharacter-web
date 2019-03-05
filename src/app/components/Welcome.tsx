import { faArrowRight, faBook, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { Button, Modal } from 'react-bootstrap';

export class Welcome extends React.Component<
  {
    closeWelcomeModal: () => void;
  },
  {}
> {
  public render() {
    return (
      <Modal.Dialog
        style={{
          marginTop: '10%',
        }}
      >
        <Modal.Header>
          <Modal.Title>
            <h5 style={{ margin: 0 }}>
              <b>Welcome to Code Character 2019!</b>
            </h5>
          </Modal.Title>
          <button
            style={{ border: 0, padding: 0, margin: 0, backgroundColor: 'white' }}
            onClick={() => this.props.closeWelcomeModal()}
          >
            <FontAwesomeIcon icon={faTimes} style={{ float: 'right', cursor: 'pointer' }} />
          </button>
        </Modal.Header>

        <Modal.Body>
          <p style={{ fontSize: 15 }}>
            Code Character is an online AI programming competition, where you write C++ code to
            strategically control an army of your own and battle others! Challenge your code against
            yourself, against existing AIs and against anyone else!
            <br />
            <br />
            <b>
              Learn the rules of the battlefield by reading the{' '}
              <a href="https://code.pragyan.org/docs/">Documentation</a>.
            </b>
            <br />
            <b>
              Found a bug? Want a new feature? Post in the{' '}
              <a href="https://forum.pragyan.org/c/code-character">Forum</a>.
            </b>
          </p>
        </Modal.Body>

        <Modal.Footer>
          <a href="https://code.pragyan.org/docs/" target="_blank">
            <Button className="btn-primary">
              Documentation &nbsp;
              <FontAwesomeIcon icon={faBook} />
            </Button>
          </a>
          <Button className="btn-success" onClick={() => this.props.closeWelcomeModal()}>
            Continue &nbsp;
            <FontAwesomeIcon icon={faArrowRight} />
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    );
  }
}
