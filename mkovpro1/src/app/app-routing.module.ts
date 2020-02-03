import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ProductComponent } from './product/product.component';
import { BusketComponent } from './busket/busket.component';
import { HelpComponent } from './help/help.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
    { path: "register", component: RegisterComponent },
    { path: "login", component: LoginComponent },
    { path: "logout", component: LogoutComponent },
    { path: "busket", component: BusketComponent },
    { path: "product", component: ProductComponent },
    { path: "help", component: HelpComponent },
    { path: "admin", component: AdminComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
