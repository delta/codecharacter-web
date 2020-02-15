import { AuthType } from 'app/types/Authentication';
import * as UserInterfaces from 'app/types/User';

export enum RegisterType {
  Student = 'Student',
  Professional = 'Professional',
}

export enum Avatar {
  ALIEN = 'assets/img/userAvatars/Alien.svg',
  CHERON = 'assets/img/userAvatars/Cheron.svg',
  CLANG = 'assets/img/userAvatars/Clang.svg',
  CRUNCH = 'assets/img/userAvatars/Crunch.svg',
  ERROR404 = 'assets/img/userAvatars/Error404.svg',
  GRANDPA = 'assets/img/userAvatars/Grandpa.svg',
  HELLBOI = 'assets/img/userAvatars/HellBoi.svg',
  JINX = 'assets/img/userAvatars/Jinx.svg',
  MALMA = 'assets/img/userAvatars/Malma.svg',
  METALPAW = 'assets/img/userAvatars/MetalPaw.svg',
  MIKE = 'assets/img/userAvatars/Mike.svg',
  NIGHTOWL = 'assets/img/userAvatars/NightOwl.svg',
  NINTURTLE = 'assets/img/userAvatars/NinTurtle.svg',
  NORRISIV = 'assets/img/userAvatars/NorrisIV.svg',
  SETH = 'assets/img/userAvatars/Seth.svg',
  SONOROUS = 'assets/img/userAvatars/Sonorous.svg',
  SPARK = 'assets/img/userAvatars/Spark.svg',
  STEELJAW = 'assets/img/userAvatars/SteelJaw.svg',
  TORRIS = 'assets/img/userAvatars/Torris.svg',
  UNKNOWN = 'assets/img/userAvatars/Unknown.svg',
  VALENTINA = 'assets/img/userAvatars/Valentina.svg',
  WALLEE = 'assets/img/userAvatars/Wall-ee.svg',
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
