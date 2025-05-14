import {IdType} from '../../shared/enums/id-type.enum';
import {MobilePrefix} from '../../shared/enums/mobile-prefix.enum';

export interface User {
  email: string,
  name: string,
  userId: string
}

export interface UserLoginForm {
  email: string,
  password: string
}

export interface UserRegistrationForm {
  email: string,
  password: string,
  username: string,
  idType: IdType,
  idNo: string,
  mobileNoPrefix: MobilePrefix,
  mobileNo: string,
  role: string
}

export interface UserDetail {
  fullName?: string;
  shortName?: string;
  email: string;
  picture?: string;
}
