import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule} from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
    declarations:[],
    imports: [
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatCardModule,
        MatDividerModule,
        MatDialogModule,
        MatTableModule,
        MatPaginatorModule,
        MatProgressSpinnerModule
    ],
    exports: [
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatCardModule,
        MatDividerModule,
        MatDialogModule,
        MatTableModule,
        MatPaginatorModule,
        MatProgressSpinnerModule
    ],
})
export class MaterialModule {}