import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NbGlobalLogicalPosition, NbToastrService } from '@nebular/theme';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BeerService {

  baseAdresse : string = "https://localhost:7111/api/"

  constructor(
    private _client : HttpClient,
    private _toast : NbToastrService
  ) { }

  getAll() : Observable<Beer[]> {
    return this._client.get<Beer[]>(this.baseAdresse+ 'beer')
  }

  getAllUser() : Observable<AppUser[]> {
    // let token = localStorage.getItem('token')
    // let header = new HttpHeaders({
    //   'Authorization': 'Bearer '+token
    // })

    return this._client.get<AppUser[]>(this.baseAdresse+ 'user')
    // return this._client.get<AppUser[]>(this.baseAdresse+ 'user', {headers : header})
  }

  create() {
    let newbeer = {name : 'Leffe', origin : 'belgique', degree : 7}

    this._client.post(this.baseAdresse+'ber', newbeer).subscribe({
      next : () => {
        this._toast.success('Bière bien enregistrée', 'Message', {position : NbGlobalLogicalPosition.TOP_END})
      },
      error : (error) => {
        this._toast.danger(error.message, 'Message', {position : NbGlobalLogicalPosition.TOP_END, duration : 10000})

      }
    })
  }

  login() {
    let user = {email : 'admin@test.com', password : 'admin1234'}

    this._client.post<AppUser>(this.baseAdresse+'user/login', user).subscribe({
      next : (data : AppUser) => {console.log(data)
        sessionStorage.setItem('currentUser', JSON.stringify(data))
        localStorage.setItem('token', data.token)

      },
      error : (error) => this._toast.danger('Erreur d\'identifant', 'Erreur', {position : NbGlobalLogicalPosition.TOP_END, duration : 10000})
    })
  }
}

export interface Beer {
  id : number
  name : string
  degree : number
  origin : string
}

export interface AppUser {
  id : number
  email : string
  role : string
  nickname : string
  token : string
}
