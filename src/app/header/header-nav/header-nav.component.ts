import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { isAuthenticated } from 'src/app/auth/state/auth.selector';
import { AuthState } from 'src/app/auth/state/auth.state';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.css']
})
export class HeaderNavComponent implements OnInit {
  isAuthenticated:Observable<boolean> | undefined
  constructor(private store :Store<AuthState>) { }

  ngOnInit(): void {
    this.isAuthenticated = this.store.select(isAuthenticated);
  }


}
