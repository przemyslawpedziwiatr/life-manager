import { Injectable } from '@angular/core';
import { User } from 'firebase';
import { Observable, of, pipe } from 'rxjs/index';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

export interface Credentials {
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly authState$: Observable<User | null> = this.fireAuth.authState;
  isUserLoggedIn = false;

  constructor(private fireAuth: AngularFireAuth) {

  }

  get user(): User | null {
    return this.fireAuth.auth.currentUser;
  }

  login({ email, password }: Credentials, {onSuccess, onError, onComplete}) {
    of(
      this.fireAuth.auth.signInWithEmailAndPassword(email, password)
    ).subscribe(
      () => {
        this.isUserLoggedIn = true;
        onSuccess && onSuccess();
      },
      () => {
        this.isUserLoggedIn = false;
        onError && onError();
      },
      () => {
        onComplete && onComplete();
      }
    );
  }

  register({ email, password }: Credentials) {
    return this.fireAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  logout(onLogout?: Function) {
    of(this.fireAuth.auth.signOut())
      .subscribe(() => onLogout && onLogout());
  }
}
