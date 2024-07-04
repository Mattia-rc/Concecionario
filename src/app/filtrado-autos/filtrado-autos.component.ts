import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink,ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-filtrado-autos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NavbarComponent],
  templateUrl: './filtrado-autos.component.html',
  styleUrl: './filtrado-autos.component.css'
})
export class FiltradoAutosComponent implements OnInit {
  vehiculos: any;
  marca: string = '';
  version: string = '';
  transmicion: string = '';
  precioDesde: number | null = null;
  precioHasta: number | null = null;
  kmDesde: number | null = null;
  kmHasta: number | null = null;
  anoDesde: number | null = null;
  anoHasta: number | null = null;

  constructor(private auth: AuthService ,private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.obtenerVehiculo();

  }

  obtenerVehiculo(filtros: any = {}): void {
    this.auth.obtenerVehiculosPublicos(filtros).subscribe(
      data => {
        this.vehiculos = data;
        console.log(this.vehiculos);
      },
      error => {
        console.error("error al obtener vehiculos en el frontend", error);
      }
    );
  }

  aplicarFiltros(): void {
    const filtros = {
      marca: this.marca,
      modelo: this.version,
      transmicion: this.transmicion,
      precioDesde: this.precioDesde,
      precioHasta: this.precioHasta,
      kmDesde: this.kmDesde,
      kmHasta: this.kmHasta,
      anoDesde: this.anoDesde,
      anoHasta: this.anoHasta
    };
    this.obtenerVehiculo(filtros);

  }



  setMarca(marca: string, event: Event): void {
    event.preventDefault();
    this.marca = marca;
  }

  setTransmicion(transmicion: string, event: Event): void {
    event.preventDefault();
    this.transmicion = transmicion;
  }


  






}
