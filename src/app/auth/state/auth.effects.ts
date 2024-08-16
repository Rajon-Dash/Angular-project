import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loginStart, loginSuccess, signupStart, signupSuccess } from './auth.action';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { Store } from '@ngrx/store';
import { SharedState } from 'src/app/component/shared/shared.state';
import { setErrorMessage, setLoadingSpinner } from 'src/app/component/shared/shared.action';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  //constructor
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<SharedState>,
    private router: Router
  ) { }

  //create a one property

  login$ = createEffect(() => {
    //filter loging start using ofType
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        //return the observable
        return this.authService.login(action.email, action.password).pipe(
          map((data) => {
            //here fatch complete so spinner of
            this.store.dispatch(setLoadingSpinner({ status: false }));
            this.store.dispatch(setErrorMessage({ message: '' }));

            const user = this.authService.formatUser(data);
            return loginSuccess({ user });
          }),
          catchError((errResp) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const errorMessage = errResp.error.error.message;
            console.log(errorMessage);
            return of(setErrorMessage({ message: errorMessage }));
          })
        );
      })
    );
  });

  loginRedirects$ = createEffect(() => {
    return this.actions$.pipe(ofType(loginSuccess),
      tap((action) => {
        this.router.navigate(['/']);
      })
    );
  }, {dispatch:false}
);


//FOR SIGNUP
signUp$ = createEffect(() => {
  //filter loging start using ofType
  return this.actions$.pipe(
    ofType(signupStart),
    exhaustMap((action) => {
      //return the observable
      return this.authService.signup(action.email, action.password).pipe(
        map((data) => {
          //here fatch complete so spinner of
          this.store.dispatch(setLoadingSpinner({ status: false }));
          // this.store.dispatch(setErrorMessage({ message: '' }));

          const user = this.authService.formatUser(data);
          return signupSuccess({ user });
        }),
        catchError((errResp) => {
          this.store.dispatch(setLoadingSpinner({ status: false }));
          const errorMessage = errResp.error.error.message;
          console.log(errorMessage);
          return of(setErrorMessage({ message: errorMessage }));
        })
      );
    })
  );
});

signUpRedirects$ = createEffect(() => {
  return this.actions$.pipe(ofType(signupSuccess),
    tap((action) => {
      this.router.navigate(['/']);
    })
  );
}, {dispatch:false}
);


}
