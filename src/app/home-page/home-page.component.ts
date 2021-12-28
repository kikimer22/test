import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PostsService } from '../shared/services/posts.service';
import { Observable } from 'rxjs';
import { Post } from '../shared/interfaces';

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
  ) {
  }

  ngOnInit() {
    this.getPosts();
  }

  private getPosts() {
    this.postsService.getAll().subscribe(posts => {
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

}
