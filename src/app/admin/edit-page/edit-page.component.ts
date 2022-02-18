import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PostsService } from '../../shared/services/posts.service';
import { switchMap } from 'rxjs/operators';
import { Post } from '../../shared/interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  post: Post;
  submitted = false;

  uSub: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postsService: PostsService,
    private cdr: ChangeDetectorRef,
    private location: Location,
  ) {
  }

  ngOnInit() {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.postsService.getById(+params.id);
      })
    ).subscribe((post: Post) => {
      this.post = post;
      this.form = new FormGroup({
        title: new FormControl(post.title, Validators.required),
        text: new FormControl(post.text, Validators.required)
      });
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    if (this.uSub) {
      this.uSub.unsubscribe();
    }
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    this.uSub = this.postsService.update({
      ...this.post,
      text: this.form.value.text,
      title: this.form.value.title,
      date: new Date(Date.now())
    }).subscribe(() => {
      this.submitted = false;
      this.router.navigate(['/admin/dashboard']);
    });
  }

  public back() {
    if (this.location) {
      this.location.back();
    } else {
      this.router.navigate(['/']);
    }
  }

}
