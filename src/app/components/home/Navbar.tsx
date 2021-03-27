import { Routes } from 'app/routes';
import * as styles from 'app/styles/LandingPage.module.css';
import classnames from 'classnames';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

export enum NavPage {
  LOGIN,
  REGISTER,
  HOME,
  LEADERBOARD,
  PROFILE,
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
          <>
            <Link to={Routes.ROOT} className="p-3">
              {' '}
              Dashboard{' '}
            </Link>
            {props.page !== NavPage.PROFILE ? (
              <Link to={Routes.USER_PROFILE_MODEL} className="p-3">
                {' '}
                Profile{' '}
              </Link>
            ) : null}
          </>
        ) : (
          <>
            {!(props.page === NavPage.LOGIN) ? (
              <Link to={Routes.LOGIN} className="p-3">
                {' '}
                Login{' '}
              </Link>
            ) : null}
            {!(props.page === NavPage.REGISTER) ? (
              <Link to={Routes.REGISTER} className="p-3">
                {' '}
                Register{' '}
              </Link>
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
        ) : (
          <Link to={Routes.HOME} className="p-3">
            {' '}
            Home{' '}
          </Link>
        )}
      </div>
    </div>
  );
};
