import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { MatDatepickerModule, MatInputModule, MatNativeDateModule, MatButtonModule, MatCardModule, MatFormFieldModule  } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { CalendarModule, DateAdapter } from 'angular-calendar';
//import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ProductComponent } from './product/product.component';
import { BusketComponent } from './busket/busket.component';
import { HelpComponent } from './help/help.component';
import { DbService } from './dbservice';
import { ShopService } from './shop.service';
import { ProductService } from './product/product.service';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [
    NavComponent,
    AppComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    BusketComponent,
    ProductComponent,
    HelpComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    //MatDatepickerModule, MatInputModule, MatNativeDateModule, MatButtonModule, MatFormFieldModule,
    //MatCardModule,
    FormsModule, ReactiveFormsModule,
    CommonModule,
    //CalendarModule.forRoot({
    //provide: DateAdapter,
    //useFactory: adapterFactory
    //})
  ],
  //providers: [DbService, ShopService, ProductService],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
