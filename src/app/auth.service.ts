import { Injectable } from '@angular/core';
import { Observable, delay, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 

  isLoggedIn: boolean = false;

  rediretedUrl: string;

  login(name: string, password: string): Observable<boolean> {
    
    const isLoggedIn = (name === 'pikachu' && password === 'pikachu');

    // return new Observable(observer => {
    //   setTimeout(() => {
    //     this.isLoggedIn = isLoggedIn;
    //     observer.next(isLoggedIn);
    //   }, 1000);
    // });

    return of(isLoggedIn).
    pipe(
      delay(1000), 
      tap(isLoggedIn => this.isLoggedIn = isLoggedIn)
    );
  }

  logout() {
    this.isLoggedIn = false;
  }
}
