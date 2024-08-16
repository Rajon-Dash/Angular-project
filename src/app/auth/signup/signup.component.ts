import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthState } from '../state/auth.state';
import { setLoadingSpinner } from 'src/app/component/shared/shared.action';
import { signupStart } from '../state/auth.action';
import { SharedState } from 'src/app/component/shared/shared.state';
import { Observable } from 'rxjs';
import { getErrorMessage } from 'src/app/component/shared/shared.selector';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  formData: any;
  errorMessage: Observable<string> | undefined


  constructor(
    private fb: FormBuilder,
    private store:Store<AuthState>,
    private sharedStore:Store<SharedState>


  ) {
    this.signupForm = this.fb.group({
      // name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSignup() {
    
    const email = this.signupForm.value.email;
    const password = this.signupForm.value.password;
    this.store.dispatch(setLoadingSpinner({status:true}))
    this.store.dispatch(signupStart({ email, password }));
    this.errorMessage = this.sharedStore.select(getErrorMessage);

  }
}
