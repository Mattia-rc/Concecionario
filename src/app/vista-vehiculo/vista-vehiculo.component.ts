import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../auth.service';
import { Lightbox, LightboxModule } from 'ngx-lightbox';


@Component({
  selector: 'app-vista-vehiculo',
  standalone: true,
  imports: [FormsModule, CommonModule, NavbarComponent, LightboxModule],
  templateUrl: './vista-vehiculo.component.html',
  styleUrl: './vista-vehiculo.component.css'
})
export class VistaVehiculoComponent implements OnInit {
  vehiculo: any;
   _albums: any[] = [];

  constructor(private route: ActivatedRoute, private authService: AuthService, private lightbox: Lightbox) {}


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.authService.obtenerVehicleSolo(id).subscribe(
        (data: any) => {
          this.vehiculo = data;
          console.log('Vehículo seleccionado:', this.vehiculo);
          
          // Cargar imágenes en _albums
          if (this.vehiculo.images && this.vehiculo.images.length > 0) {
            this.vehiculo.images.forEach((image: string) => {
              const album = {
                src: 'http://localhost:7000/' + image,
                caption: this.vehiculo.marca + ' ' + this.vehiculo.modelo
              };
              this._albums.push(album);

            });
            console.log(this._albums, "img")
            
          }
        },
        error => {
          console.error('Error en el frontend', error);
        }
      );
    }

    
  }

  abrirImagen(index: number): void {
    console.log("esto abre el abrir imagenes", this._albums, index)
    this.lightbox.open(this._albums, index);
  }
}