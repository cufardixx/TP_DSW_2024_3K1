import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { PerfilComponent } from './pages/perfil/perfil.component';

export const routes: Routes = [
    { path: "", component: LandingComponent , title: 'Home'},
    { path: "login", component: LoginComponent ,title: 'Login'},
    { path: "register", component: RegisterComponent, title: 'Register' },
    { path: "profile", component: PerfilComponent, title: 'Perfil' },
    { path: "**", redirectTo: "", pathMatch: "full" }
];
