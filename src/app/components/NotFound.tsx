import * as NotFoundPageInterfaces from 'app/types/NotFound';
import * as React from 'react';
import { NavBar, NavPage } from './home/Navbar';

export class NotFound extends React.Component<NotFoundPageInterfaces.Props, {}> {
  public render() {
    return (
      <div className="w-100 h-100" style={{ position: 'absolute' }}>
        <NavBar isLoggedIn={this.props.isLoggedIn} page={NavPage.NOT_FOUND} />
        <div className="text-center" style={{ position: 'relative', top: '20%' }}>
          <h1 className="font-weight-bold">404</h1>
          <br />
          <h1>The page you requested is not found</h1>
        </div>
      </div>
    );
  }
}
