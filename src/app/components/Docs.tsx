import * as styles from 'app/styles/Docs.module.css';
import classnames from 'classnames';
import * as React from 'react';

export class Docs extends React.Component<{}, {}> {
  public render() {
    return (
      <iframe src="https://code.pragyan.org/docs/" className={classnames(styles['docs-iframe'])} />
    );
  }
}
