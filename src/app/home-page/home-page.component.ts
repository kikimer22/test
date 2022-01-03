import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PostsService } from '../shared/services/posts.service';
import { Observable } from 'rxjs';
import { Post } from '../shared/interfaces';
import { NestBeService } from '../shared/services/nest-be.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent implements OnInit {

  public posts: Post[];
  public isLoading = true;

  constructor(
    private postsService: PostsService,
    private cdr: ChangeDetectorRef,
    private nestBeService: NestBeService,
  ) {
  }

  ngOnInit() {
    this.getPosts();
  }

  private getPosts() {
    this.postsService.getAll().subscribe((posts: Post[]) => {
      console.log(posts);
      this.isLoading = false;
      if (posts) {
        this.posts = posts;
      } else {
        this.posts = [];
      }
      this.cdr.detectChanges();
    });
  }

  public getUsersFromBe() {
    this.nestBeService.getUsers().subscribe((users: any) => {
      console.log(users);
    });
  }

}
