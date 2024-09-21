import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { PrefilEditComponent } from './pages/prefil-edit/prefil-edit.component';
import { RegistrarEventoComponent } from './pages/registrar-evento/registrar-evento.component';
import { MisEventosComponent } from './pages/mis-eventos/mis-eventos.component';
import { EditarEventoComponent } from './pages/editar-evento/editar-evento.component';

export const routes: Routes = [
    { path: "", component: LandingComponent , title: 'Home'},
    { path: "login", component: LoginComponent ,title: 'Login'},
    { path: "register", component: RegisterComponent, title: 'Register' },
    { path: "profile", component: PerfilComponent, title: 'Perfil' },
    { path: "profile/:id", component: PrefilEditComponent, title: 'Perfil' },
    { path: "create-event", component: RegistrarEventoComponent, title: 'Crear Evento' },
    { path: "my-events", component: MisEventosComponent, title: 'Mis Eventos' },
    { path: "edit-event/:id", component: EditarEventoComponent, title: 'Editar Evento' },
    { path: "**", redirectTo: "", pathMatch: "full" }
];
