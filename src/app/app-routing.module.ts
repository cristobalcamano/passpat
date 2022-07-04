import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { LoadComponent } from './pages/load/load.component';
import { ErrorComponent } from './error/error/error.component';

const routes: Routes = [
  { path: 'user/:id/:idservice', component: PagesComponent},
  { path: 'loader', component: LoadComponent},
  { path: 'error', component: ErrorComponent},
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
