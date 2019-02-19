import { AuthType } from 'app/types/Authentication';
import * as UserInterfaces from 'app/types/User';

export enum RegisterType {
  Student = 'Student',
  Professional = 'Professional',
}

export enum Avatar {
  BABOON = 'assets/img/userAvatars/001-baboon.svg',
  BEAR = 'assets/img/userAvatars/002-bear.svg',
  BISON = 'assets/img/userAvatars/003-bison.svg',
  BOAR = 'assets/img/userAvatars/004-boar.svg',
  BUFFALO = 'assets/img/userAvatars/005-buffalo.svg',
  CAT = 'assets/img/userAvatars/006-cat.svg',
  CHIPMUNK = 'assets/img/userAvatars/007-chipmunk.svg',
  DEER = 'assets/img/userAvatars/008-deer.svg',
  DOG = 'assets/img/userAvatars/009-dog.svg',
  ELEPHANT = 'assets/img/userAvatars/010-elephant.svg',
  FOX = 'assets/img/userAvatars/011-fox.svg',
  GORILLA = 'assets/img/userAvatars/012-gorilla.svg',
  HAMSTER = 'assets/img/userAvatars/013-hamster.svg',
  HORSE = 'assets/img/userAvatars/014-horse.svg',
  JAGUAR = 'assets/img/userAvatars/015-jaguar.svg',
  KANGAROO = 'assets/img/userAvatars/016-kangaroo.svg',
  KOALA = 'assets/img/userAvatars/017-koala.svg',
  LION = 'assets/img/userAvatars/018-lion.svg',
  MOLE = 'assets/img/userAvatars/019-mole.svg',
  MONKEY = 'assets/img/userAvatars/020-monkey.svg',
}

export interface State {
  avatar: string;
  collegeName?: string;
  isCaptchaValidated: boolean;
  isFormSubmitted: boolean;
  username: string;
  isStudent: boolean;
  password: string;
  repeatPassword: string;
  email: string;
  country: string;
  fullName: string;
  pragyanId?: string;
  type: RegisterType;
}
export interface StateProps {
  errorMessage: string;
}

export interface ElementOwnProps {
  handleSelectPanel: (authType: AuthType) => void;
}

export interface DispatchProps {
  checkUsernameExists: (username: string) => void;
  register: (registerDetails: UserInterfaces.Register) => void;
  updateErrorMessage: (errorMessage: string) => void;
}

export type Props = StateProps & DispatchProps & ElementOwnProps;
