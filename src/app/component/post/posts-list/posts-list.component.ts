import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PostsState } from '../state/post.state';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { getPosts } from '../state/post.selector';
import { deletePost } from '../state/post.actions';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {
 posts:Observable<Post[]> | undefined;
  constructor(private store:Store<PostsState>) { }

  ngOnInit(): void {
    this.posts = this.store.select(getPosts);
  }


  //delete post

  onDeletePost(id :any ){
    if (confirm("Are you sure want to delete?")) {
      this.store.dispatch(deletePost({id}))
    }
  }

}
