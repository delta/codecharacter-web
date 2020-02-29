import { Props } from 'app/types/Authentication/ActivateUser';
import * as React from 'react';

// tslint:disable-next-line: variable-name
export const ActivateUser: React.FunctionComponent<Props> = (props: Props) => {
  React.useEffect(() => {
    // get the activation code from url
    const token = props.location.search.split('=')[1];
    props.activateUser(token);
  });
  return <h1>{props.message}</h1>;
};
