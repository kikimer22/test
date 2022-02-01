import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PostsService } from '../shared/services/posts.service';
import { Observable, Subscription } from 'rxjs';
import { Post } from '../shared/interfaces';
import { NestBeService } from '../shared/services/nest-be.service';
import firebase from 'firebase/compat';
import User = firebase.User;
import { AuthService, UserBE } from '../shared/services/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent implements OnInit {

  public posts: Post[];
  public isLoading = true;
  public user: User;
  public subscriptions: Subscription = new Subscription();


  constructor(
    private postsService: PostsService,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private nestBeService: NestBeService,
  ) {
  }

  ngOnInit() {
    this.getPosts();
  }

  private getPosts() {
    this.postsService.getAll().subscribe((posts: Post[]) => {
      // console.log(posts);
      this.isLoading = false;
      if (posts) {
        this.posts = posts;
      } else {
        this.posts = [];
      }
      this.cdr.detectChanges();
    });
  }

  public getUser() {
    // const subscription = this.authService.user$.subscribe((userData) => {
    //   if (userData) {
    //     const userBE: UserBE = {email: userData.email, uid: userData.uid};
    //     this.nestBeService.saveUserInBE(userBE);
    //   }
    // });
    // this.subscriptions.add(subscription);
  }

}
