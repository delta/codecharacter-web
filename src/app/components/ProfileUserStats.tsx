import { Avatar } from 'app/types/Authentication/Register';
import * as ProfileUserInterface from 'app/types/ProfileUser';
import * as React from 'react';

export default class ProfileUserStats extends React.Component<ProfileUserInterface.Props, {}> {
  public componentDidMount() {
    this.props.getUserDetails('');
    this.props.getMatchStats(this.props.match.params.username);
  }
  public render() {
    // console.log(this.props.profileUserDetails);
    return (
      <div>
        {
          // @ts-ignore
          <img src={Avatar[this.props.profileUserDetails.avatar]} />
        }
      </div>
    );
  }
}
