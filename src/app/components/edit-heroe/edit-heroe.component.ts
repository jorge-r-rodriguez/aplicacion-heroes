import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { HeroeModel } from '../../models/heroe.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-edit-heroe',
  templateUrl: './edit-heroe.component.html',
  styleUrl: './edit-heroe.component.scss'
})
export class EditHeroeComponent implements OnInit {
  form: FormGroup;
  action: string;
  heroeSelected: HeroeModel;
  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
    public heroeService: HeroesService,
    public dialog: DialogRef) {
    this.action = data.action;
    this.heroeSelected = data.heroeSelected
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      nombre: new FormControl(this.heroeSelected ? this.heroeSelected.nombre : '', [Validators.required, Validators.max(50)]),
      edad: new FormControl(this.heroeSelected ? this.heroeSelected.edad : 0),
      pais: new FormControl(this.heroeSelected ? this.heroeSelected.pais : '', [Validators.required,  Validators.max(50)]),
      poder: new FormControl(this.heroeSelected ? this.heroeSelected.poder : '', [Validators.required,  Validators.max(50)]),
      descripcion: new FormControl(this.heroeSelected ? this.heroeSelected.descripcion : '')
    })
  }


  addHeroe() {
    let aux = this.form.getRawValue()
    let heroe = {
      nombre: aux.nombre,
      edad: aux.edad,
      pais: aux.pais,
      poder: aux.poder,
      id: this.heroeSelected ? this.heroeSelected.id : this.heroeService.getId(),
      descripcion: aux.descripcion
    }
    if (this.data.action == 'add') {
      this.heroeService.addHeroe(heroe);
      this.dialog.close()
    } else {
      this.heroeService.editHeroe(heroe)
      this.dialog.close();
    }

  }
}
