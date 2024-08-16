import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthState } from '../state/auth.state';
import { loginStart } from '../state/auth.action';
import { setLoadingSpinner } from 'src/app/component/shared/shared.action';
import { Observable } from 'rxjs';
import { getErrorMessage } from 'src/app/component/shared/shared.selector';
import { SharedState } from 'src/app/component/shared/shared.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage: Observable<string> | undefined
  loginForm: FormGroup;
  formData: any;

  constructor(
    private fb: FormBuilder,
    private store:Store<AuthState>,
    private sharedStore:Store<SharedState>

  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void { }

  onLogin() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    //for spinner 
    this.store.dispatch(setLoadingSpinner({status:true}))
    this.store.dispatch(loginStart({ email, password }));

    //error message
    this.errorMessage = this.sharedStore.select(getErrorMessage);
  }
}
