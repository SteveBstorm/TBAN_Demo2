import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { FakeauthService } from 'src/app/services/fakeauth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  menuList! : NbMenuItem[]

  isConnected! : boolean
  constructor(
    private _service : FakeauthService
  ) { }

  ngOnInit(): void {
    this.menuList = [
      {link : '/demo1', title : 'Demo 1', icon : 'attach'},
      {link : '/demo2', title : 'Demo 2', icon : 'attach'},
    ]

    this._service.isConnectedSubject.subscribe({
      next : (data : boolean) => {this.isConnected = data
        console.log('fais coucou')
      }
    })

    //this._service.emitIsConnected()
  }

}
