import { Routes } from '@angular/router';
import { EmpresasComponent } from './empresas/empresas.component';
import { PrincipalComponent } from './principal/principal.component';

export const routes: Routes = [
    {path: '', component: PrincipalComponent},
    {path: 'empresas', component: EmpresasComponent}
];
