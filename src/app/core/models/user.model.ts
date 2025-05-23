import {IdType} from '../../shared/enums/id-type.enum';
import {MobilePrefix} from '../../shared/enums/mobile-prefix.enum';

export interface User {
  email: string,
  name: string,
  userId: string
}

export interface UserAuth0 {
  email?: string,
  name?: string,
  platform?: string
  picture?: string;
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
