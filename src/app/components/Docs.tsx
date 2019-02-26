import * as React from 'react';
import classnames from 'classnames';
import * as styles from 'app/styles/Docs.module.css';

export class Docs extends React.Component<{}, {}> {
  public render() {
    return (
      <iframe
        src="https://docs.readthedocs.io"
        className={classnames(styles['docs-iframe'])}
      />
    );
  }
}
