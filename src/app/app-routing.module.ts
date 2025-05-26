import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { notAuthdGuard } from './guards/not-authd.guard';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProtectedComponent } from './pages/protected/protected.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [notAuthdGuard] },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [notAuthdGuard],
  },
  {
    path: 'protected',
    component: ProtectedComponent,
    canActivate: [authGuard],
  },
  { path: '', component: HomeComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
