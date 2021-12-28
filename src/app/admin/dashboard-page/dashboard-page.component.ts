import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { PostsService } from '../../shared/services/posts.service';
import { Post } from '../../shared/interfaces';
import { Subscription } from 'rxjs';
import { AlertService } from '../shared/services/alert.service';

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

  constructor(
    private postsService: PostsService,
    private alert: AlertService,
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

  public remove(id: string) {
    const subscription = this.postsService.remove(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id);
      this.alert.warning('Пост был удален');
    });
    this.subscriptions.add(subscription);
  }

}
