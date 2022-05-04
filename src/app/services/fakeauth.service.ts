import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FakeauthService {

  _isConnected! : boolean

  get isConnected() : boolean {
    return localStorage.getItem('isConnected') == 'true' ? true : false
  }

  //Suject nécéssite l'envoi d'une première valeur manuellement
  //isConnectedSubject : Subject<boolean> = new Subject<boolean>()

  //BehaviorSuject envoi une valeur par défaut qui lui est passée dans son constructeur
  isConnectedSubject : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isConnected)

  emitIsConnected() {
    this.isConnectedSubject.next(this.isConnected)
  }

  currentUser! : User

  constructor() { }

  login() {
    this._isConnected = true
    this.currentUser = {id : 1, login : 'toto'}
    sessionStorage.setItem('isConnected', this._isConnected.toString())
    localStorage.setItem('isConnected', this._isConnected.toString())
    sessionStorage.setItem('user', JSON.stringify(this.currentUser))
    this.emitIsConnected()
  }

  logout() {
    this._isConnected = false
    sessionStorage.removeItem('isConnected')
    sessionStorage.removeItem('user')
    sessionStorage.clear()
    localStorage.clear()
    this.emitIsConnected()
  }
}

export interface User {
  id : number
  login : string
}
