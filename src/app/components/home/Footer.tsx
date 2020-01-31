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
          <div className="row">
            <div className="col col-md">
              <h5>Contact</h5>
              <ul className="list-unstyled text-small">
                <Table>
                  <tr onClick={() => copyToClipboard('8428747686')}>
                    <td>Sai Haemanth</td>
                    <td>8428747686</td>
                  </tr>
                  <tr onClick={() => copyToClipboard('8428747686')}>
                    <td>Mario</td>
                    <td>9444018377</td>
                  </tr>
                  <tr onClick={() => copyToClipboard('8428747686')}>
                    <td>Kumaran</td>
                    <td>9566541342</td>
                  </tr>
                </Table>
              </ul>
            </div>
            <div className="col col-md">
              <h5>Documentation</h5>
              <ul className="list-unstyled text-small">
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">Bots</a>
                </li>
                <li>
                  <a href="#">Towers</a>
                </li>
                <li>
                  <a href="#">States</a>
                </li>
                <li>
                  <a href="#">Terrain</a>
                </li>
              </ul>
            </div>
            <div className="col col-md">
              <h5>Quick Links</h5>
              <ul className="list-unstyled text-small">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <a href="https://pragyan.org">Pragyan</a>
                </li>
                <li>
                  <a href="https://www.pragyan.org/20/home/events/bytehoc/code_character/">
                    Pragyan - CodeCharacter
                  </a>
                </li>
                <li>
                  <a href="https://forum.pragyan.org/t/code-character-frequently-asked-questions/20">
                    Forum
                  </a>
                </li>
              </ul>
            </div>
            {/* <div className="col-lg-4 pr-5">
              <h5 className="ft_title m-0">Reach out to us</h5>
              <form className="container-fluid d-flex flex-column">
                <input
                  className={classnames(
                    'row my-1',
                    'form-control',
                    'form-control-sm',
                    style.input_area,
                  )}
                  type="text"
                  name="name"
                  placeholder="Enter Your name"
                />
                <input
                  className={classnames(
                    'row my-1',
                    'form-control',
                    'form-control-sm',
                    style.input_area,
                  )}
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                />
                <textarea
                  className={classnames(
                    'row my-1',
                    'form-control',
                    'form-control-sm',
                    style.input_area,
                  )}
                  name="message"
                  placeholder="Message"
                ></textarea>
                <button
                  className={classnames(
                    'row form-control',
                    'form-control-sm',
                    'btn btn-info my-1',
                    style.input_area,
                    style.submitButton,
                  )}
                  type="submit"
                  value="Subscribe"
                >
                  Submit
                </button>
              </form>
            </div> */}
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
          &copy; 2020 Made with <span style={{ color: 'red' }}>❤</span> by{' '}
          <a href="https://delta.nitt.edu"> Delta Force</a>
        </div>
      </div>
    </div>
  );
};
