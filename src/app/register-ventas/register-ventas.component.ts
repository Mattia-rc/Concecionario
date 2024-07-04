import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registro-ventas',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register-ventas.component.html',
  styleUrl: './register-ventas.component.css'
})
export class RegistroVentasComponent implements OnInit{
  usuario:any;
  constructor(private auth:AuthService){ }

  ngOnInit(): void {
    this.obtenerUsuario()
  }
  obtenerUsuario() {
    this.auth.obtenerUsuario().subscribe(
      (data) => {
        this.usuario = data;
      },
      error => {
        console.error("Error al obtener usuario", error);
      }
    );
  }
}
