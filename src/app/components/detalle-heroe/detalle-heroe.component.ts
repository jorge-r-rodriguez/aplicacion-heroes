import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from '../../models/heroe.model';

@Component({
  selector: 'app-detalle-heroe',
  templateUrl: './detalle-heroe.component.html',
  styleUrl: './detalle-heroe.component.scss'
})
export class DetalleHeroeComponent implements OnInit {


  heroe: HeroeModel

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private heroeService: HeroesService){

  }

  ngOnInit(){
let id;
this.activatedRoute.params.subscribe(res =>{ id = res['id']});
  this.heroe = this.heroeService.getHeroe(id);
  console.log(this.heroe)
  }

  volver(){
    this.router.navigate(['/home'])
  }
}
