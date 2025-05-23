import {
  AfterViewChecked,
  Component,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Store} from '@ngxs/store';
import {UserLogin, UserLoginAuth0} from '../../store/user/user.action';
import {UserAuth0, UserLoginForm} from '../../core/models/user.model';
import {NxColComponent, NxLayoutComponent, NxRowComponent} from '@aposin/ng-aquila/grid';
import {NxLinkComponent} from '@aposin/ng-aquila/link';
import {NxMessageComponent} from '@aposin/ng-aquila/message';
import {NxFormfieldComponent} from '@aposin/ng-aquila/formfield';
import {NxInputDirective, NxPasswordToggleComponent} from '@aposin/ng-aquila/input';
import {NxButtonComponent} from '@aposin/ng-aquila/button';
import {AuthService} from '@auth0/auth0-angular';
import {filter, from, switchMap, take} from 'rxjs';

@Component({
  selector: 'app-login-page',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NxLayoutComponent,
    NxColComponent,
    NxRowComponent,
    NxFormfieldComponent,
    NxInputDirective,
    NxButtonComponent,
    NxPasswordToggleComponent,
    NxLinkComponent,
    NxMessageComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements AfterViewChecked, OnInit {
  @ViewChild('bannerCol', {read: ElementRef, static: false}) bannerCol!: ElementRef;
  viewportHeight: number = window.innerHeight;
  viewportWidth: number = window.innerWidth;
  showError: boolean = false;

  loginForm: FormGroup = new FormGroup({
    userId: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  private renderer = inject(Renderer2);
  private router: Router = inject(Router);
  private store: Store = inject(Store);
  private auth: AuthService = inject(AuthService);

  ngOnInit(): void {
    this.auth.isAuthenticated$.pipe(
      filter(isAuthenticated => isAuthenticated),
      take(1),
      switchMap(() => this.auth.user$),
      switchMap(user =>
        from(this.auth.getAccessTokenSilently()).pipe(
          switchMap(token => {
            if (user && token) {

              const userLoginPayload: UserAuth0 = {
                email: user.email,
                name: user.name,
                platform: user.sub,
                picture: user.picture,
              }

              this.store.dispatch(new UserLoginAuth0(userLoginPayload));
            }
            return [];
          })
        )
      )
    ).subscribe();
  }

  ngAfterViewChecked(): void {
    this.updateBannerHeight();
  }

  @HostListener('window:resize', ['$event.target'])
  onResize(): void {
    this.updateBannerHeight();
  }

  onLoginUser() {
    if (this.loginForm.valid) {
      const userLoginPayload: UserLoginForm = {
        email: this.loginForm.value?.userId,
        password: this.loginForm.value?.password
      }

      this.store.dispatch(new UserLogin(userLoginPayload)).subscribe({
        next: val => {
          this.router.navigate(['dashboard']);
        },
        error: err => this.showError = true
      });
    }
  }

  loginWithAuth0() {
    this.auth.loginWithRedirect({
      appState: { target: '/dashboard' }
    });
  }

  goToUserRegistration() {
    this.router.navigate(['registration']);
  }

  private updateBannerHeight(): void {
    const siteFooterHeight = document.querySelector('#siteFooter')?.clientHeight;
    this.updateViewportSize();
    if (this.viewportWidth >= 992) {
      this.viewportHeight > 822
        ? this.renderer.setStyle(this.bannerCol.nativeElement, 'height', `${this.viewportHeight - (siteFooterHeight ? siteFooterHeight : 85)}px`)
        : this.renderer.setStyle(this.bannerCol.nativeElement, 'height', '738px');
    } else {
      this.renderer.setStyle(this.bannerCol.nativeElement, 'height', '400px')
    }
  }

  private updateViewportSize(): void {
    this.viewportHeight = window.innerHeight;
    this.viewportWidth = window.innerWidth;
  }
}
