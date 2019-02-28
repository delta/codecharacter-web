import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';

export class Docs extends React.Component<{}, {}> {
  public render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <a
          style={{
            backgroundColor: 'black',
            color: 'white',
            display: 'block',
            height: 25,
            left: 387,
            padding: '1px 0px 0px 5px',
            position: 'absolute',
            top: '0%',
            width: 25,
            zIndex: 1000,
          }}
          target="_blank"
          href="https://code.pragyan.org/docs/"
        >
          <FontAwesomeIcon icon={faExternalLinkAlt} />
        </a>
        <iframe
          src="https://code.pragyan.org/docs/overview.html"
          style={{
            border: 0,
            height: '100%',
            width: '100%',
          }}
        />
      </div>
    );
  }
}
