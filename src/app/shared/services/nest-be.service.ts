import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NestBeService {

  constructor(
    private http: HttpClient
  ) {
  }

  public getUsers(): Observable<any> {
    return this.http.get(`${environment.beUrl}/users`).pipe(
      map((response: any) => {
        console.log(response);
        return response;
      })
    );
  }

}
