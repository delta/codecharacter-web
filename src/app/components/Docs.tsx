import * as React from 'react';

export class Docs extends React.Component<{}, {}> {
  public render() {
    return (
      <iframe
        src="https://docs.readthedocs.io"
        style={{ width: '100%', height: '100%' }}
      />
    );
  }
}
