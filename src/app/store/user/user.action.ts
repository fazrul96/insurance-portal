import {UserAuth0, UserLoginForm, UserRegistrationForm} from "../../core/models/user.model";

export class UserLogin {
  static readonly type = 'USER LOGIN';
  constructor(public payload: UserLoginForm) {};
}

export class UserLoginAuth0 {
  static readonly type = 'USER LOGIN AUTH0';
  constructor(public payload: UserAuth0) {}
}

export class UserRegistration {
  static readonly type = 'USER REGISTRATION';
  constructor(public payload: UserRegistrationForm) {};
}

export class UserLogout {
  static readonly type = 'USER LOGOUT';
  constructor() {};
}
