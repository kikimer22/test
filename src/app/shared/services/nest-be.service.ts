import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { UserBE, UserFromBE } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NestBeService {

  constructor(
    private http: HttpClient
  ) {
  }

  public getUserByUid(uid: string, idToken: string): Observable<UserFromBE> {
    // const requestOptions = {
    //   headers: new HttpHeaders({
    //     Authorization: `Bearer ${idToken}`
    //   })
    // };
    return this.http.get(`${environment.beUrl}/users/${uid}`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  public saveUserInBE(userBE: UserBE, idToken: string): any {
    // const requestOptions = {
    //   headers: new HttpHeaders({
    //     Authorization: `Bearer ${idToken}`
    //   })
    // };
    return this.http.post<UserBE>(`${environment.beUrl}/users`, userBE).pipe(
      map((response: any) => {
        return response;
      })
    ).subscribe();
  }

}
