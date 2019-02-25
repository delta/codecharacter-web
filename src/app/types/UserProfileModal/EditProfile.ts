import * as UserInterfaces from 'app/types/User';
import { InputName, InputState, ListDisabled } from 'app/types/UserProfileModal';
import * as React from 'react';
// tslint:disable-next-line:import-name
import ReactFlagsSelect from 'react-flags-select';

export interface ElementOwnProps {
  handleEditProfile: (event: React.FormEvent<HTMLFormElement>) => void;
  onInputChange: (inputName: InputName, value: string) => void;
  inputEnabler: (inputState: InputState, value: boolean) => void;
  editProfileRef: React.Ref<HTMLFormElement>;
  reactFlagRef: React.Ref<ReactFlagsSelect>;
  username: string;
  listDisabled: ListDisabled;
  fullName: string;
  userDetails: UserInterfaces.UserStoreState;
  country: string;
  avatar: string;
}

export type Props = ElementOwnProps;
