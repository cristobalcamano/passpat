import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Modules Angular
import { RouterModule } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { Interceptor } from './interceptor/interceptor';
import { PersonalDataComponent } from './pages/personal-data/personal-data.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AmountPayableComponent } from './pages/amount-payable/amount-payable.component';
import { PaymentModelComponent } from './pages/payment-model/payment-model.component';

@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    NotFoundComponent,
    DashboardComponent,
    PersonalDataComponent,
    AmountPayableComponent,
    PaymentModelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
