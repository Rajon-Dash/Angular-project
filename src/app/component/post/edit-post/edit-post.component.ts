import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsState } from '../state/post.state';
import { Store } from '@ngrx/store';
import { getPostById } from '../state/post.selector';
import { Post } from 'src/app/models/post.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { updatePost } from '../state/post.actions';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  post!: Post;
  postForm : FormGroup | any;
  constructor(
    private route: ActivatedRoute,
    private store:Store<PostsState>,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      const id = paramMap.get('id');
      this.store.select(getPostById,{id}).subscribe((data)=>{
        this.post=data;
        this.createForm();
      })
    });
  }
  createForm(){
    this.postForm = new FormGroup({
      title: new FormControl(this.post.title,[
        Validators.required,
        Validators.minLength(6),
      ]),
      description: new FormControl(this.post.description,[
        Validators.required,
        Validators.minLength(10),
      ]),
    })
  }

  onSubmit(){
    const post:Post = {
      id:this.post.id,
       title:this.postForm.value.title,
     description:this.postForm.value.description
    }
    // dispatch the action
    this.store.dispatch(updatePost({post})) ;
    this.router.navigate(['/posts']);

  }

}
