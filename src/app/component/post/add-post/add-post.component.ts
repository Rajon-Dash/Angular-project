import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Post } from 'src/app/models/post.model';
import { PostsState } from '../state/post.state';
import { addPost } from '../state/post.actions';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  postForm:FormGroup | any

  constructor(private store:Store<PostsState>) { }

  ngOnInit(): void {
    this.postForm = new FormGroup({
      title: new FormControl(null,[
        Validators.required,
        Validators.minLength(5),
      ]),
      description: new FormControl(null,[
        Validators.required,
        Validators.minLength(10),
      ]),
    })
  }

  onAddPost(){
    const post:Post ={
      title:this.postForm.value.title,
      description:this.postForm.value.description
    }
    this.store.dispatch(addPost({post}))
  }

}
