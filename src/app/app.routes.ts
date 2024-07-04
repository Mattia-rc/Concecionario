import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { VistaAdminComponent } from './vista-admin/vista-admin.component';
import { CreatevehiculoComponent } from './createvehiculo/createvehiculo.component';
import { ViewCarsComponent } from './view-cars/view-cars.component';
import { AllVehiclesComponent } from './all-vehicles/all-vehicles.component';
import { UpdateVehiculoComponent } from './update-vehiculo/update-vehiculo.component';
import { RegistroVentasComponent } from './register-ventas/register-ventas.component';
import { PerfilAdminComponent } from './perfil-admin/perfil-admin.component';
import { ContactoComponent } from './contacto/contacto.component';
import { FiltradoAutosComponent } from './filtrado-autos/filtrado-autos.component';
import { VistaVehiculoComponent } from './vista-vehiculo/vista-vehiculo.component';

export const routes: Routes = [
    {path:'', component:AllVehiclesComponent},
    {path:'login', component: LoginComponent},
    { path: 'vehiculo/:id', component: UpdateVehiculoComponent },
    {path:'register', component:RegisterComponent},
    {path:'vista_Admin', component:VistaAdminComponent},
    {path:'vista_create_vehicle', component:CreatevehiculoComponent},
    {path:'vista_viewAll', component:ViewCarsComponent},
    {path:'registrar_ventas', component:RegistroVentasComponent},
    {path:'perfil_admin', component:PerfilAdminComponent},
    {path:'contacto', component:ContactoComponent},
    {path:'autos', component:FiltradoAutosComponent},
    {path:'vehiculo_vista/:id', component:VistaVehiculoComponent}


];
