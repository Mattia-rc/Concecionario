import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
    selector: 'app-createvehiculo',
    standalone: true,
    imports: [FormsModule, CommonModule, RouterLink, NavbarComponent],
    templateUrl: './createvehiculo.component.html',
    styleUrl: './createvehiculo.component.css'
})
export class CreatevehiculoComponent implements OnInit {

    usuario: any;

    constructor(private auth: AuthService, private router: Router) { }

    ngOnInit(): void {
        this.obtenerUsuario();
    }

    onSubmit(form: NgForm): void {
        const { marca, modelo, precio, kilometraje, transmicion, descripcion, ano } = form.value;
        const imageFiles = (document.getElementById('images') as HTMLInputElement).files;
    
        if (marca && modelo && precio && kilometraje && transmicion && descripcion && imageFiles && ano) {
            const formData = new FormData();
            formData.append('marca', marca);
            formData.append('modelo', modelo);
            formData.append('precio', precio);
            formData.append('kilometraje', kilometraje);
            formData.append('transmicion', transmicion);
            formData.append('descripcion', descripcion);
            formData.append('ano', ano);
    
            for (let i = 0; i < imageFiles.length; i++) {
                formData.append('images', imageFiles[i]);
            }
    
            // Asegúrate de que los archivos se están enviando correctamente
            console.log("FormData enviado:", formData);
    
            this.auth.createVehiculo(formData).subscribe(
                res => {
                    console.log("Vehículo creado con su data: ", res);
                    this.router.navigate(['/vista_Admin']);
                },
                error => {
                    console.error("Error al crear el vehículo: ", error);
                }
            );
        } else {
            console.error("Todos los campos son obligatorios");
        }
    }

    obtenerUsuario() {
        this.auth.obtenerUsuario().subscribe(
            data => {
                this.usuario = data;
            },
            error => {
                console.error("Error al obtener usuario", error);
            }
        );
    }
}
