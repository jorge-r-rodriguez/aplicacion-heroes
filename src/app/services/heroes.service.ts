import { Injectable } from '@angular/core';
import { HeroeModel } from '../models/heroe.model';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  heroes: HeroeModel[] = [
    { nombre: 'Iron Man', pais: 'España', edad: 54, poder: 'Fuerza', descripcion: 'Iron Man (conocido en español como el Hombre de Hierro) es un superhéroe que aparece en los cómics estadounidenses publicados por Marvel Comics.', id: 1 },
    { nombre: 'Wolverine', pais: 'Japon', edad: 221, poder: 'Tecnica', descripcion: 'El personaje fue creado por el escritor y editor Stan Lee en colaboración con el guionista Larry Lieber.​ Los artistas Don Heck y Jack Kirby fueron los encargados de su diseño.', id: 2 },
    { nombre: 'Spider-Man', pais: 'Estados Unidos', edad: 30,  poder: 'Inteligencia', descripcion: 'Traje formado por la tercera generación de partículas inestables, lo que le permite alterar la apariencia del mismo.', id: 3 }
  ]

  id: number = this.heroes.length;
  constructor() { }

  getId() {
    let idAux = this.id;
    this.id = this.id + 1
    return idAux + 1
  }


  addHeroe(heroe) {
    this.heroes.push(heroe)
  }

  editHeroe(heroe) {
    let idAux;
    this.heroes.forEach((h, idx) => {
      if (h.id == heroe.id) {
        idAux = idx
      }
    })
    this.heroes.splice(idAux, 1, heroe);
  }

  deleteHeroe(heroe) {

    let idAux;
    this.heroes.forEach((h, idx) => {
      if (h.id == heroe.id) {
        idAux = idx
      }
    })
    this.heroes.splice(idAux, 1)
  }

  getHeroes() {
    return [...this.heroes];
  }


  filtrarHeroes(str) {
    if(str){

      let heroesFiltrados = this.heroes
      .filter(item => item.nombre.toLowerCase().indexOf(str.toLowerCase()) >= 0);
      return heroesFiltrados
    }else{
      return this.heroes
    }

  }


  getHeroe(id){
    return this.heroes.find( h => h.id == id)
  }
}
