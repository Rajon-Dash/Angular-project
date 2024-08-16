import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedState } from './component/shared/shared.state';
import { Store } from '@ngrx/store';
import { getLoading } from './component/shared/shared.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'finalProject';

  showLoading!: Observable<boolean>;
  constructor (private store:Store<SharedState>){}

  ngOnInit(): void {
      this.showLoading=this.store.select(getLoading);
  }

}
