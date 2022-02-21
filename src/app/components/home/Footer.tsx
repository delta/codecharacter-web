import * as style from 'app/styles/Footer.module.css';
import classnames from 'classnames';
import * as React from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// tslint:disable-next-line: variable-name
export const Footer: React.FunctionComponent = () => {
  const copyToClipboard = (text: string) => {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    // TODO send toast (`${text} copied to clipboard`);
  };

  return (
    <div>
      <div className={classnames('container-fluid', style.footer_head)}>
        <footer className="container py-5">
          <div className="row justify-content-md-around">
            <div className="col col-md-3">
              <h5>Contact</h5>
              <ul className="list-unstyled text-small">
                <Table>
                  <tbody>
                    <tr onClick={() => copyToClipboard('9994479069')}>
                      <td>Bestin</td>
                      <td>8111931125</td>
                    </tr>
                    <tr onClick={() => copyToClipboard('9566541342')}>
                      <td>Anirudh</td>
                      <td>8870888215</td>
                    </tr>
                  </tbody>
                </Table>
              </ul>
            </div>
            <div className="col col-md-3">
              <h5>Quick Links</h5>
              <ul className="list-unstyled text-small">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <a href="https://delta.nitt.edu/codecharacter-docs/">Documentation</a>
                </li>
                <li>
                  <a href="https://www.pragyan.org/21/home/events/bytehoc/code_character/">
                    Pragyan - CodeCharacter
                  </a>
                </li>
                <li>
                  <a href="https://forum.pragyan.org/t/code-character-frequently-asked-questions/21">
                    Forum
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
      <div
        className={classnames(
          'row',
          'justify-content-md-between',
          'align-items-center',
          'py-2',
          style.footer_ribbon,
        )}
      >
        <div className="col text-center">
          &copy; 2021 Made with <span style={{ color: 'red' }}>❤</span> by{' '}
          <a href="https://delta.nitt.edu"> Delta Force</a>
        </div>
      </div>
    </div>
  );
};
