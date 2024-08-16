import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './component/home/home.component';
import { PostsListComponent } from './component/post/posts-list/posts-list.component';
import { HeaderNavComponent } from './header/header-nav/header-nav.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { AUTH_STATE_NAME } from './auth/state/auth.selector';
import { AuthReducer } from './auth/state/auth.reducer';
import { EffectsFeatureModule, EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { AuthEffects } from './auth/state/auth.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { LoadingSpinnerComponent } from './component/loading-spinner/loading-spinner.component';
import { SharedReducer } from './component/shared/shared.reducer';
import { postsReducer } from './component/post/state/post.reducer';
import { AddPostComponent } from './component/post/add-post/add-post.component';
import { EditPostComponent } from './component/post/edit-post/edit-post.component';
import { PostsEffects } from './component/post/state/post.effects';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    PostsListComponent,
    HeaderNavComponent,
    LoadingSpinnerComponent,
    AddPostComponent,
    EditPostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    EffectsModule.forRoot([AuthEffects,PostsEffects]),
    StoreModule.forRoot({
      'auth':AuthReducer,
      'shared':SharedReducer,
      'posts' : postsReducer

    }),
    HttpClientModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
