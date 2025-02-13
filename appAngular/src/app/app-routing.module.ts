import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlatsListComponent } from './plats-list/plats-list.component';
import { AddPlatComponent } from './add-plat/add-plat.component';
import { PlatDetailComponent } from './plats-detail/plats-detail.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EditPlatComponent } from './edit-plat/edit-plat.component';

const routes: Routes = [
  { path: 'edit-plat/:id', component: EditPlatComponent },
  { path: '', redirectTo: '/plats', pathMatch: 'full' }, // Redirige vers la liste des plats
  { path: 'plats', component: PlatsListComponent },
  { path: 'add-plat', component: AddPlatComponent },
  { path: 'plat/:id', component: PlatDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
