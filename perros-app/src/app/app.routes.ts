import { Routes } from '@angular/router';
import { Perros } from './perros';

export const routes: Routes = [
  { path: 'perros', component: Perros },
  { path: '', redirectTo: 'perros', pathMatch: 'full' }
];
