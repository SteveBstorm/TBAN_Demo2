import { Component, OnInit } from '@angular/core';
import { FakeauthService } from './services/fakeauth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isConnected! : boolean

  constructor(private _authService : FakeauthService) {}
  ngOnInit(): void {
    this._authService.isConnectedSubject.subscribe({
      next : (data : boolean) => {this.isConnected = data}
    })
  }
  title = 'TBAN_Demo2';
}
