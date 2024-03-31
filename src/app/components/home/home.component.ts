import { AfterViewInit, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditHeroeComponent } from '../edit-heroe/edit-heroe.component';
import { HeroeModel } from '../../models/heroe.model';
import { HeroesService } from '../../services/heroes.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
// import { EditHeroeComponent } from 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

  form: FormGroup
  heroes: HeroeModel[] = [];

  displayLoading: boolean = false;

  displayedColumns = ['nombre', 'edad', 'poder', 'pais', 'acciones']
  dataSource = new MatTableDataSource<HeroeModel>();
  Subscription = new Subscription;

  constructor(public dialog: MatDialog, public heroeService: HeroesService, public router: Router) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.form = new FormGroup({
      heroe: new FormControl('')
    })

    this.Subscription = this.form.controls['heroe'].valueChanges.pipe(debounceTime(400),distinctUntilChanged()).subscribe(res => {
      console.log(res, 'res')
   
        this.heroes = this.heroeService.filtrarHeroes(res);
        this.dataSource.data = this.heroes;
    })


    this.getHeroes();

  }

 
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;

  }

  ngOnDestroy(): void {
    this.Subscription.unsubscribe();
  }

  addHeroe() {
    let data = {
      action: 'add',
      heroeSelected: null
    }
    const dialogRef = this.dialog.open(EditHeroeComponent, { data: data });

    dialogRef.afterClosed().subscribe(result => {
      this.loading();
      console.log(`Dialog result: ${result}`);
      this.getHeroes();
    });
  }


  loading(){
    this.displayLoading = true;
    setTimeout(()=>{
      this.displayLoading = false
    }, 1000)
  }

  getHeroes() {
    this.heroes = this.heroeService.getHeroes();
    this.dataSource.data = this.heroes;
    this.dataSource.paginator = this.paginator;

  }

  editHeroe(heroe) {
this.loading();
    console.log(heroe)
    let data = {
      action: 'edit',
      heroeSelected: heroe
    }
    const dialogRef = this.dialog.open(EditHeroeComponent, { data: data });

    dialogRef.afterClosed().subscribe(result => {
      this.getHeroes();
    });

  }


  deleteHeroe(heroe) {
    this.loading();
    this.heroeService.deleteHeroe(heroe);
    this.getHeroes();
  }


  detalleHeroe(heroe) {
    this.router.navigate([`/detalle-heroe/${heroe.id}`])
  }
}
