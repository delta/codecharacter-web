import { AuthType } from 'app/types/Authentication';
import * as UserInterfaces from 'app/types/User';

export enum RegisterType {
  Student = 'Student',
  Professional = 'Professional',
}

export enum Avatar {
  'CRUNCH' = 'assets/img/userAvatars/Crunch.svg',
  'EVORTRON' = 'assets/img/userAvatars/Evortron.svg',
  'WALL-E' = 'assets/img/userAvatars/Wall-e.svg',
  'GRAMPY' = 'assets/img/userAvatars/Grampy.svg',
  'MANTUS' = 'assets/img/userAvatars/Mantus.svg',
  'METALMOLLY' = 'assets/img/userAvatars/MetalMolly.svg',
  'NIGHTOWL' = 'assets/img/userAvatars/NightOwl.svg',
  'SETH' = 'assets/img/userAvatars/Seth.svg',
  'EVE' = 'assets/img/userAvatars/Eve.svg',
  'SPARK' = 'assets/img/userAvatars/Spark.svg',
  'STEELJAW' = 'assets/img/userAvatars/SteelJaw.svg',
  'TENEL' = 'assets/img/userAvatars/Tenel.svg',
  'TORRIS' = 'assets/img/userAvatars/Torris.svg',
  'YLVIS' = 'assets/img/userAvatars/Ylvis.svg',
  'TWOBIT' = 'assets/img/userAvatars/Twobit.svg',
  'VALENTINA' = 'assets/img/userAvatars/Valentina.svg',
  'VORIAN' = 'assets/img/userAvatars/Vorian.svg',
  'WEEBO' = 'assets/img/userAvatars/Weebo.svg',
}

export enum AvatarId {
  BABOON = 0,
  BEAR = 2,
  BISON = 3,
  BOAR = 4,
  BUFFALO = 5,
  CAT = 6,
  CHIPMUNK = 7,
  DEER = 8,
  DOG = 9,
  ELEPHANT = 10,
  FOX = 11,
  GORILLA = 12,
  HAMSTER = 13,
  HORSE = 14,
  JAGUAR = 15,
  KANGAROO = 16,
  KOALA = 17,
  LION = 18,
  MOLE = 19,
  MONKEY = 20,
}

export enum Steps {
  USER_DETAILS = 0,
  CREDENTIALS = 1,
  OTHERS = 2,
}

export interface State {
  avatar: string;
  currentStep: Steps;
  collegeName?: string;
  isCaptchaValidated: boolean;
  isFormSubmitted: boolean;
  username: string;
  isStudent: boolean;
  password: string;
  isRegistered: boolean;
  repeatPassword: string;
  email: string;
  country: string;
  fullName: string;
  pragyanId?: string;
  type: RegisterType;
}
export interface StateProps {
  isLoggedIn: boolean;
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
