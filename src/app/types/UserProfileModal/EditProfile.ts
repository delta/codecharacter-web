import * as UserInterfaces from 'app/types/User';
import { InputName } from 'app/types/UserProfileModal';
import * as React from 'react';
// tslint:disable-next-line:import-name
import ReactFlagsSelect from 'react-flags-select';

export interface ElementOwnProps {
  handleEditProfile: (event: React.FormEvent<HTMLFormElement>) => void;
  onInputChange: (inputName: InputName, value: string) => void;
  editProfileRef: React.Ref<HTMLFormElement>;
  reactFlagRef: React.Ref<ReactFlagsSelect>;
  username: string;
  fullName: string;
  userDetails: UserInterfaces.UserStoreState;
  country: string;
  avatar: string;
}

export type Props = ElementOwnProps;
