import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, map, of, ReplaySubject } from 'rxjs';
import { IUser } from '../shared/models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSorce = new ReplaySubject<IUser | null>(1);
  currentUser$ = of(this.currentUserSorce);

  constructor(private http: HttpClient, private router: Router) {}

  loadCurrentUser(token: String | null) {
    if (token === null) {
      this.currentUserSorce.next(null);
      return of(null);
    }

    let headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get<IUser>(this.baseUrl + 'account', { headers }).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUserSorce.next(user);
        }
      })
    );
  }

  login(values: any) {
    return this.http.post<IUser>(`${this.baseUrl}account/login`, values).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUserSorce.next(user);
        }
      })
    );
  }

  register(values: any) {
    return this.http
      .post<IUser>(`${this.baseUrl}account/register`, values)
      .pipe(
        map((user: IUser) => {
          if (user) {
            localStorage.setItem('token', user.token);
            this.currentUserSorce.next(user);
          }
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUserSorce.next(null);
    this.router.navigateByUrl('/');
  }

  checkEmailExists(email: string) {
    return this.http.get(`${this.baseUrl}account/email-exists?email=${email}`);
  }
}
