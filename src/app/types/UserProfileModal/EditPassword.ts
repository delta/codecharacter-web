import * as UserInterfaces from 'app/types/User';
import { InputName } from 'app/types/UserProfileModal';
import * as React from 'react';
export interface ElementOwnProps {
  handleEditPassword: (event: React.FormEvent<HTMLFormElement>) => void;
  onInputChange: (inputName: InputName, value: string) => void;
  editPasswordRef: React.Ref<HTMLFormElement>;
  userDetails: UserInterfaces.UserStoreState;
  oldPassword: string;
  password: string;
  repeatPassword: string;
}

export type Props = ElementOwnProps;
