import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-vista-admin',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './vista-admin.component.html',
  styleUrl: './vista-admin.component.css'
})
export class VistaAdminComponent implements OnInit{

dataVehiculos:any;
usuario:any;

constructor(private authService: AuthService){ }

ngOnInit(): void {
  this.obtenerUsuario();
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
