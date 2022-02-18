import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { PostsService } from '../../shared/services/posts.service';
import { Post } from '../../shared/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  public posts: Post[] = [];
  private subscriptions: Subscription = new Subscription();
  public isLoading = true;
  public searchStr = '';
  private direction = 'up';

  constructor(
    private postsService: PostsService,
    private cdr: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    this.getPosts();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private getPosts() {
    const subscription = this.postsService.getAll().subscribe(posts => {
      console.log(posts);
      this.isLoading = false;
      if (posts) {
        this.posts = posts;
      } else {
        this.posts = [];
      }
      this.cdr.detectChanges();
    });
    this.subscriptions.add(subscription);
  }

  public remove(id: number) {
    const subscription = this.postsService.remove(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id);
      this.cdr.detectChanges();
    });
    this.subscriptions.add(subscription);
  }

  sortBy(key: string) {

    function compare(a, b) {
      if (a[key] < b[key]) {
        return -1;
      }
      if (a[key] > b[key]) {
        return 1;
      }
      return 0;
    }

    function compareReverse(a, b) {
      if (a[key] < b[key]) {
        return 1;
      }
      if (a[key] > b[key]) {
        return -1;
      }
      return 0;
    }

    if (this.direction === 'up') {
      this.posts.sort(compare);
    } else {
      this.posts.sort(compareReverse);
    }

    this.direction = this.direction === 'up' ? 'down' : 'up';

  }
}
