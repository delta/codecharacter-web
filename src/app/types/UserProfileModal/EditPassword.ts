import * as UserInterfaces from 'app/types/User';
import { InputName, InputState, ListDisabled } from 'app/types/UserProfileModal';
import * as React from 'react';
export interface ElementOwnProps {
  handleEditPassword: (event: React.FormEvent<HTMLFormElement>) => void;
  onInputChange: (inputName: InputName, value: string) => void;
  inputEnabler: (inputState: InputState, value: boolean) => void;
  editPasswordRef: React.Ref<HTMLFormElement>;
  listDisabled: ListDisabled;
  userDetails: UserInterfaces.UserStoreState;
  oldPassword: string;
  password: string;
  repeatPassword: string;
}

export type Props = ElementOwnProps;
