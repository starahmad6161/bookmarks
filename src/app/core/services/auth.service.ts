import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userID = new BehaviorSubject(null);

  constructor(private _AngularFireAuth:AngularFireAuth) {
    this.getUser().subscribe(user => {
      if (user) {
        this.userID.next(user.uid);
      } else {
        this.userID.next(null)
      }
    });
  }

  getUser() {
    return this._AngularFireAuth.authState;
  }

  logIn(email, password) {
    return this._AngularFireAuth.signInWithEmailAndPassword(email, password);
  }
  signup(email, password) {
    return this._AngularFireAuth.createUserWithEmailAndPassword(email, password);
  }
  logOut() {
    return this._AngularFireAuth.signOut();
  }

}
