import { Component, OnInit } from '@angular/core';
import { AppUser, Beer, BeerService } from 'src/app/services/beer.service';

@Component({
  selector: 'app-demo2',
  templateUrl: './demo2.component.html',
  styleUrls: ['./demo2.component.scss']
})
export class Demo2Component implements OnInit {

  listBiere! : Beer[]

  listUser! : AppUser[]

  constructor(
    private _beerService : BeerService
  ) { }

  ngOnInit(): void {
    this._beerService.getAll().subscribe({
      next : (data : Beer[]) => {
        this.listBiere = data
      }
    })

    this._beerService.getAllUser().subscribe({
      next : (data : AppUser[]) => {
        this.listUser = data
      },
      error : (error) =>  {
        console.log(error)
      }
    })
  }

  ajout() {
    this._beerService.create()
  }

  login() {
    this._beerService.login()
  }

}
