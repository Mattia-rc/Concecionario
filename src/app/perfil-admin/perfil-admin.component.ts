import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-perfil-admin',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './perfil-admin.component.html',
  styleUrl: './perfil-admin.component.css'
})
export class PerfilAdminComponent implements OnInit{

  usuario:any;
  constructor(private auth:AuthService) { }
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
