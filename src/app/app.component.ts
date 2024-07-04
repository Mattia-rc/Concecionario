import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { VistaAdminComponent } from './vista-admin/vista-admin.component';
import { AllVehiclesComponent } from './all-vehicles/all-vehicles.component';
import { UpdateVehiculoComponent } from './update-vehiculo/update-vehiculo.component';
import { FooterComponent } from './footer/footer.component';
import { LightboxModule  } from 'ngx-lightbox'



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,NavbarComponent, VistaAdminComponent,AllVehiclesComponent, UpdateVehiculoComponent, FormsModule, RouterLink,FooterComponent,LightboxModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
