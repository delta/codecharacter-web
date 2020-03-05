import { Routes } from 'app/routes';
import * as styles from 'app/styles/LandingPage.module.css';
import classnames from 'classnames';
import * as React from 'react';
import { HashLink } from 'react-router-hash-link';

export enum NavPage {
  LOGIN,
  REGISTER,
  HOME,
}

// tslint:disable-next-line: variable-name
export const NavBar = (props: { isLoggedIn: boolean; page: NavPage }) => {
  return (
    <div className={classnames(styles.nav)}>
      <input type="checkbox" className={classnames(styles['nav-check'])} id="nav-check" />
      <div className={classnames(styles['nav-header'], 'container-fluid')}>
        <div className={classnames(styles['nav-title'], 'p-lg-3')}>CodeCharacter</div>
      </div>
      <div className={classnames(styles['nav-btn'])}>
        <label htmlFor="nav-check">
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>
      <div className={classnames(styles['nav-links'])}>
        {props.isLoggedIn ? (
          <HashLink to={Routes.ROOT} className="p-3">
            {' '}
            Play!{' '}
          </HashLink>
        ) : (
          <>
            {!(props.page === NavPage.LOGIN) ? (
              <HashLink to={Routes.LOGIN} className="p-3">
                {' '}
                Login{' '}
              </HashLink>
            ) : null}
            {!(props.page === NavPage.REGISTER) ? (
              <HashLink to={Routes.REGISTER} className="p-3">
                {' '}
                Register{' '}
              </HashLink>
            ) : null}
            {!(props.page === NavPage.HOME) ? (
              <HashLink to={Routes.HOME} className="p-3">
                {' '}
                Home{' '}
              </HashLink>
            ) : null}
          </>
        )}
        {props.page === NavPage.HOME ? (
          <>
            <HashLink to="#about" className="p-3">
              About
            </HashLink>
            <HashLink to="#faq" className="p-3">
              FAQ
            </HashLink>
            <HashLink to="#contact" className="p-3">
              Contact
            </HashLink>
          </>
        ) : null}
      </div>
    </div>
  );
};
