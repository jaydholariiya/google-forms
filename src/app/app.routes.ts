import { Routes } from '@angular/router';
import { AddDataComponent } from './add-data/add-data.component';
import { GetDataComponent } from './get-data/get-data.component';
import { StoreDataComponent } from './store-data/store-data.component';

export const routes: Routes = [
  { path: '', component: AddDataComponent },
  { path: 'get-data', component: GetDataComponent },
  { path: 'store-data', component: StoreDataComponent },
];
