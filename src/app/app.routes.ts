import { Routes } from '@angular/router';

//  Autenticación
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/registro/register.component';
import { ResetComponent } from './auth/password/reset.component';

//  Módulos adicionales
import { RegisterSolicitudesComponent } from './solicitudes/servicios.component'; // Componente de solicitudes y servicios

export const routes: Routes = [
  // Redirección principal
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // ruta raíz

  // ---  AUTENTICACIÓN ---
  { path: 'login', component: LoginComponent }, // Componente de inicio de sesión
  { path: 'registro', component: RegisterComponent }, // Componente de registro
  { path: 'password', component: ResetComponent }, // Componente de restablecimiento de contraseña

  // ---  SOLICITUDES / SERVICIOS ---
  { path: 'servicios', component: RegisterSolicitudesComponent }, // Componente de registro de solicitudes
  { path: 'solicitudes', component: RegisterSolicitudesComponent },

  // ---  RUTA POR DEFECTO ---
  { path: '**', redirectTo: 'login' }, // si alguien escribe una ruta no válida
];
