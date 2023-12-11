import { Routes } from '@angular/router';
import { AddDataComponent } from './add-data/add-data.component';
import { GetDataComponent } from './get-data/get-data.component';

export const routes: Routes = [
  { path: 'add-data', component: AddDataComponent },
  { path: 'get-data', component: GetDataComponent },
];
