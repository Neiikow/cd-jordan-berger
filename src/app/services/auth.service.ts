import { Injectable } from '@angular/core';
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router){}

  login(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        signInWithEmailAndPassword(getAuth(), email, password)
          .then((userCredential) => {
            resolve(userCredential.user)
            localStorage.setItem('uid', userCredential.user.uid)
            this.router.navigate(['/home'])
          })
          .catch((error) => {
            reject(error)
          })
      }
    );
  }

  logout() {
    signOut(getAuth())
      .then(() => {
        localStorage.removeItem("uid");
        this.router.navigate(['/home'])
      });
  }

  isAuthenticated(): boolean {
    const localUid = localStorage.getItem('uid');

    if (localUid === getAuth().currentUser?.uid) {
      return true;
    }
    return false;
  }
}