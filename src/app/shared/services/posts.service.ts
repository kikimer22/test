import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FbCreateResponse, Post } from '../interfaces';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PostsService {
  constructor(
    private http: HttpClient
  ) {
  }

  public create(post: Post): Observable<Post> {
    return this.http.post(`${environment.firebase.databaseURL}/posts.json`, post)
      .pipe(map((response: FbCreateResponse) => {
        return {
          ...post,
          id: response.name,
          date: new Date(post.date)
        };
      }));
  }

  public getAll(): Observable<Post[]> {
    return this.http.get(`${environment.firebase.databaseURL}/posts.json`)
      .pipe(map((response: { [key: string]: any }) => {
        if (response && Object.keys(response).length) {
          return Object
            .keys(response)
            .map(key => ({
              ...response[key],
              id: key,
              date: new Date(response[key].date)
            }));
        } else {
          return [];
        }
      }));
  }

  public getById(id: string): Observable<Post> {
    return this.http.get<Post>(`${environment.firebase.databaseURL}/posts/${id}.json`)
      .pipe(map((post: Post) => {
        return {
          ...post, id,
          date: new Date(post.date)
        };
      }));
  }

  public remove(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.firebase.databaseURL}/posts/${id}.json`);
  }

  public update(post: Post): Observable<Post> {
    return this.http.patch<Post>(`${environment.firebase.databaseURL}/posts/${post.id}.json`, post);
  }

}
