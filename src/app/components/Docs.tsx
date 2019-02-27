import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';

export class Docs extends React.Component<{}, {}> {
  public render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <a
          style={{
            position: 'absolute',
            display: 'block',
            backgroundColor: 'black',
            color: 'white',
            padding: '1px 0px 0px 5px',
            top: '0%',
            left: 387,
            width: 25,
            height: 25,
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
            width: '100%',
            height: '100%'
          }}
        />
      </div>
    );
  }
}
