import * as ProfileUserInterface from 'app/types/ProfileUser';
import * as React from 'react';

export default class ProfileUserStats extends React.Component<ProfileUserInterface.Props, {}> {
  public render() {
    console.log(this.props.match.params.username);
    return <p>This is the Page for Profile user stats</p>;
  } 
}
