import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { map } from "rxjs";
import { NxDialogService, NxModalRef } from "@aposin/ng-aquila/modal";
import {UserLogin, UserLoginAuth0, UserLogout, UserRegistration} from "./user.action";
import {USER_STATE_DEFAULT, UserStateAuth0Model, UserStateModel} from "./user.state.model";
import {UserService} from '../../core/services/user.service';
import {MessageModalData} from '../../core/models/message-modal-data.model';
import {User} from '../../core/models/user.model';
import {MessageModalComponent} from '../../shared/components/message-modal/message-modal.component';

@State<UserStateModel>({
  name: 'UserState',
  defaults: USER_STATE_DEFAULT
})

@Injectable()
export class UserState {
  private userService = inject(UserService);
  private dialogService = inject(NxDialogService);
  private router = inject(Router);
  private dialogRef?: NxModalRef<any>;

  @Selector()
  static getJwtToken(state: UserStateModel): string {
    return structuredClone(state.jwtToken);
  }

  @Selector()
  static getUser(state: UserStateModel): User {
    return structuredClone(state.userDetails);
  }

  @Selector()
  static getUsername(state: UserStateModel): string {
    return structuredClone(state.userDetails.name);
  }

  @Selector()
  static isLoggedIn(state: UserStateModel): boolean {
    return (state.jwtToken !== '' && state.userDetails.userId !== '');
  }

  @Action(UserLogin)
  userLogin({setState}: StateContext<UserStateModel>, {payload}: UserLogin) {
    return this.userService.userLogin(payload).pipe(
      map(res => {
        setState({
          jwtToken: res.data.token,
          userDetails: {
            name: res.data.username,
            email: res.data.email,
            userId: res.data.userId
          }
        });
      })
    );
  }

  @Action(UserLoginAuth0)
  userLoginAuth0(ctx: StateContext<UserStateAuth0Model>, { payload }: UserLoginAuth0) {
    ctx.setState({
      userDetails: {
        name: payload.name,
        email: payload.email,
        platform: payload.platform,
        picture: payload.picture
      }
    });
  }

  @Action(UserRegistration)
  userRegistration({}: StateContext<UserStateModel>,
    {payload}: UserRegistration
  ) {
    return this.userService.userRegistration(payload).pipe(
      map(res => res.message)
    ).subscribe(res => {
      const messageData: MessageModalData = {
        header: 'Success',
        message: res
      }
      this.dialogRef = this.dialogService.open(MessageModalComponent, {
        data: messageData,
        disableClose: true,
        ariaLabel: 'Success Message'
      });
      this.dialogRef.afterClosed().subscribe(() => {
        this.router.navigate(['login']);
      })
    });
  }

  @Action(UserLogout)
  userLogout({setState}: StateContext<UserStateModel>): void {
    setState(USER_STATE_DEFAULT);
    this.router.navigate(['login']);
  }
}
