import { NgModule } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule, MatProgressSpinnerModule} from "@angular/material";
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

const components = [
  BrowserAnimationsModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatInputModule,
  MatTooltipModule,
  MatButtonToggleModule,
  MatSnackBarModule,
  MatDialogModule,
  MatButtonModule,
  MatAutocompleteModule,
];

@NgModule({
  declarations: [],
  imports: [
    components,
  ],
  exports: [
    components,
  ]
})
export class MaterialModule { }
