import { AuthType } from 'app/types/Authentication';
import * as UserInterfaces from 'app/types/User';

export enum RegisterType {
  Student = 'Student',
  Professional = 'Professional',
}

export enum Avatar {
  CRUNCH = 'assets/img/userAvatars/Crunch.svg',
  EVORTRON = 'assets/img/userAvatars/Evortron.svg',
  GERTY = 'assets/img/userAvatars/Gerty.svg',
  GRAMPY = 'assets/img/userAvatars/Grampy.svg',
  MANTUS = 'assets/img/userAvatars/Mantus.svg',
  METALMOLLY = 'assets/img/userAvatars/MetalMolly.svg',
  METALPAW = 'assets/img/userAvatars/MetalPaw.svg',
  NIGHTOWL = 'assets/img/userAvatars/NightOwl.svg',
  SETH = 'assets/img/userAvatars/Seth.svg',
  SONOROUS = 'assets/img/userAvatars/Sonorous.svg',
  SPARK = 'assets/img/userAvatars/Spark.svg',
  STEELJAW = 'assets/img/userAvatars/SteelJaw.svg',
  TENEL = 'assets/img/userAvatars/Tenel.svg',
  TORRIS = 'assets/img/userAvatars/Torris.svg',
  TWOBIT = 'assets/img/userAvatars/Twobit.svg',
  VALENTINA = 'assets/img/userAvatars/Valentina.svg',
  VORIAN = 'assets/img/userAvatars/Vorian.svg',
  WEEBO = 'assets/img/userAvatars/Weebo.svg',
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
