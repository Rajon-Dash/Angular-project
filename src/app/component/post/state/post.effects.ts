import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PostService } from 'src/app/service/post.service';
import { loadPosts, loadPostsSuccess } from './post.actions'; // Make sure loadPostsSuccess is defined
import { map, mergeMap } from 'rxjs/operators';

@Injectable()
export class PostsEffects {
  constructor(private actions$: Actions, private postService: PostService) {}

  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPosts),
      mergeMap(() =>
        this.postService.getPosts().pipe(
          map((posts) => {
            // Return a success action with the retrieved posts
            return loadPostsSuccess({ posts });
          })
        )
      )
    )
  );
}
