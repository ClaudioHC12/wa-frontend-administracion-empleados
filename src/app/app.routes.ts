import { Routes } from '@angular/router';
import { EmpleadoRegistrarComponent } from './components/empleado-registrar/empleado-registrar.component';
import { EmpleadosComponent } from './components/empleados/empleados.component';

export const routes: Routes = [
    { path: '', component:  EmpleadosComponent},
    { path: 'empleado', component: EmpleadoRegistrarComponent },
    { path: 'empleado/:id', component: EmpleadoRegistrarComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
