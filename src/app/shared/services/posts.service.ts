import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FbCreateResponse, Post } from '../interfaces';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({providedIn: 'root'})
export class PostsService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {
  }

  public create(post: Post): Observable<Post> {
    // const requestOptions = {
    //   headers: new HttpHeaders({
    //     Authorization: `Bearer ${this.authService.idToken}`
    //   })
    // };
    return this.http.post<Post>(`${environment.beUrl}/posts`, post);
  }

  public getAll(): Observable<Post[]> {
    // const requestOptions = {
    //   headers: new HttpHeaders({
    //     Authorization: `Bearer ${this.authService.idToken}`
    //   })
    // };
    return this.http.get<Post[]>(`${environment.beUrl}/posts`);
  }

  public getById(id: string): Observable<Post> {
    // const requestOptions = {
    //   headers: new HttpHeaders({
    //     Authorization: `Bearer ${this.authService.idToken}`
    //   })
    // };
    return this.http.get<Post>(`${environment.beUrl}/posts/${id}`);
  }

  public remove(id: string): Observable<void> {
    // const requestOptions = {
    //   headers: new HttpHeaders({
    //     Authorization: `Bearer ${this.authService.idToken}`
    //   })
    // };
    return this.http.delete<void>(`${environment.beUrl}/posts/${id}`);
  }

  public update(post: Post): Observable<Post> {
    return this.http.patch<Post>(`${environment.firebase.databaseURL}/posts/${post.id}.json`, post);
  }

}
