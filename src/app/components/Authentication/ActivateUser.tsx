import { Props } from 'app/types/Authentication/ActivateUser';
import * as React from 'react';

export class ActivateUser extends React.Component<Props> {
  public componentDidMount() {
    const params = this.props.location.search.split('&');
    const token = params[0].split('=')[1];
    const userId = params[1].split('=')[1];
    this.props.activateUser(token, parseInt(userId, 0));
  }

  public render() {
    return <h1>{this.props.message}</h1>;
  }
}
