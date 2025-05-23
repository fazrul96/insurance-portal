import {User, UserAuth0} from "../../core/models/user.model";

export interface UserStateModel {
  userDetails: User,
  jwtToken: string
}

export interface UserStateAuth0Model {
  userDetails: UserAuth0
}

export const USER_STATE_DEFAULT: UserStateModel = {
  userDetails: {
    email: '',
    name: '',
    userId: ''
  },
  jwtToken: ''
}
