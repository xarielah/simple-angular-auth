import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, delay, finalize, of } from 'rxjs';
import { AuthUser, User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  _http = inject(HttpClient);

  private $user = new BehaviorSubject<User | null>(null);
  $loggedUser = this.$user.asObservable();
  private $loading = new BehaviorSubject<boolean>(false);
  $isLoading = this.$loading.asObservable();

  setUser(user: User | null) {
    this.$user.next(user);
  }

  logout() {
    this.saveUser(null);
    return of().pipe(delay(3000));
  }

  register(user: AuthUser) {
    this.$loading.next(true);
    const loggedUser: User = {
      username: user.username,
      email: user.email,
    };
    return of(loggedUser).pipe(
      delay(3000),
      finalize(() => {
        this.saveUser(loggedUser);
        this.$loading.next(false);
        console.log('logged out successfuly');
      })
    );
  }

  getUser() {
    let user = null;
    if (this.$user.value) {
      user = this.$user.value;
    } else if (localStorage.getItem('user')) {
      // Get user from LocalStorage cache
      user = JSON.parse(localStorage.getItem('user') as string);
    }

    if (user) this.setUser(user);
  }

  login(user: Omit<AuthUser, 'email'>) {
    this.$loading.next(true);
    const loggedUser: User = {
      username: user.username,
      email: `${user.username}@example.com`,
    };
    return of(loggedUser).pipe(
      delay(3000),
      finalize(() => {
        this.saveUser(loggedUser);
        this.$loading.next(false);
        console.log('logged in successfuly');
      })
    );
  }

  saveUser(user: User | null) {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
    this.setUser(user);
  }
}
