import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AmountPayableComponent } from './pages/amount-payable/amount-payable.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PaymentMethodComponent } from './pages/payment-method/payment-method.component';
import { PaymentModelComponent } from './pages/payment-model/payment-model.component';
import { PagesComponent } from './pages/pages.component';

const routes: Routes = [
  { path: 'user/:id/:idservice', component: PagesComponent},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
