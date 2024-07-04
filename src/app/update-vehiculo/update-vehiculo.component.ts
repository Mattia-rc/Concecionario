import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink , Router, ActivatedRoute} from '@angular/router';
import { AuthService } from '../auth.service';
import { NavbarComponent } from '../navbar/navbar.component';
@Component({
  selector: 'app-update-vehiculo',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink,NavbarComponent],
  templateUrl: './update-vehiculo.component.html',
  styleUrl: './update-vehiculo.component.css'
})
export class UpdateVehiculoComponent implements OnInit{
  vehiculo: any = {};
  usuario:any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) { }
  
  ngOnInit(): void {
    this.obtenerUsuario()
  }

  onSubmit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Obtener el ID del vehículo desde la ruta

    // Verificar que id no sea nulo antes de continuar
    if (id) {
      console.log("el id del vehiculo es: ", id)
      this.authService.updateVehiculo(id, this.vehiculo).subscribe(
        () => {
          console.log("Vehículo actualizado correctamente");
          this.router.navigate(['/vista_Admin']); // Redirigir al usuario a la vista de administrador después de la actualización
        },
        error => {
          console.error('Error al actualizar vehículo', error);
        }
      );
    } else {
      console.error('ID de vehículo no encontrado en la ruta');
      // Aquí puedes manejar el caso donde no se encontró un ID válido en la URL, por ejemplo, redirigir a una página de error.
    }
  }
  obtenerUsuario() {
    this.authService.obtenerUsuario().subscribe(
      (data) => {
        this.usuario = data;
      },
      error => {
        console.error("Error al obtener usuario", error);
      }
    );
  }
}
