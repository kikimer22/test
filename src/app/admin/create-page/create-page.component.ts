import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from '../../shared/interfaces';
import { PostsService } from '../../shared/services/posts.service';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreatePageComponent implements OnInit {

  form: FormGroup;

  constructor(
    private postsService: PostsService,
    private authService: AuthService,
    private router: Router,
    private location: Location,
  ) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required),
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    const post: Post = {
      title: this.form.value.title,
      authorUid: this.authService.user$.value.uid,
      text: this.form.value.text,
      date: new Date(Date.now())
    };

    this.postsService.create(post).subscribe(() => {
      this.form.reset();
      this.router.navigate(['admin', 'dashboard']);
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
