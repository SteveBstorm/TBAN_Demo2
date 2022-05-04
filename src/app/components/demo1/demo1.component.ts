import { Component, OnInit } from '@angular/core';
import { FakeauthService } from 'src/app/services/fakeauth.service';

@Component({
  selector: 'app-demo1',
  templateUrl: './demo1.component.html',
  styleUrls: ['./demo1.component.scss']
})
export class Demo1Component implements OnInit {

  isConnected! : boolean

  constructor(
    private _service : FakeauthService
  ) { }

  ngOnInit(): void {
    this.isConnected = localStorage.getItem('isConnected') == 'true' ? true : false
  }

  login() {
    this._service.login()
    this.isConnected = this._service.isConnected
  }

  logout() {
    this._service.logout()
    this.isConnected = this._service.isConnected
  }

}
