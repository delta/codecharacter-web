import * as styles from 'app/styles/CommitMessageBox.module.css';
import * as CommitMessageBoxInterfaces from 'app/types/CommitMessageBox';
import classnames from 'classnames';
import * as React from 'react';
import { Grid, Row } from 'react-bootstrap';

export class CommitMessageBox extends React.Component<CommitMessageBoxInterfaces.Props, {}> {
  private commitMessageRef = React.createRef<HTMLFormElement>();
  constructor(props: CommitMessageBoxInterfaces.Props) {
    super(props);
  }

  public render() {
    const { commitMessage, isCommitMessageBoxOpen, updateCommitMessage } = this.props;
    return (
      <div
        className={classnames(styles.CommitMessageBox, {
          [`${styles.hideCommitMessageBox}`]: !isCommitMessageBoxOpen,
        })}
      >
        <form noValidate ref={this.commitMessageRef} onSubmit={this.handleCommit}>
          <Grid fluid={true} className={classnames(styles.modal)}>
            <Row className="mt-2">
              <div className="w-100">
                <div className="col form-row mb-2">
                  <div className="input-group">
                    <input
                      className="form-control"
                      id="validationUsername"
                      placeholder="Describe your commit."
                      maxLength={50}
                      required
                      value={commitMessage}
                      onChange={(e) => updateCommitMessage(e.target.value)}
                    />
                    <button
                      type="submit"
                      className={classnames(styles.customBtn, 'btn btn-info ml-3')}
                    >
                      Commit
                    </button>
                    <div className="invalid-feedback">Please enter valid commit message.</div>
                  </div>
                </div>
              </div>
            </Row>
          </Grid>
        </form>
      </div>
    );
  }

  private handleCommit = (event: React.FormEvent<HTMLFormElement>) => {
    const { handleCommit } = this.props;
    const form = this.commitMessageRef.current;
    event.preventDefault();
    if (form) {
      if (form.checkValidity()) {
        handleCommit();
      }
      form.classList.add('was-validated');
    }
  };
}
