import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink,NavbarComponent, FooterComponent],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent implements OnInit {
  contact = {
    name: '',
    email: '',
    message: '',
    apellido: ''
  };

  constructor(private auth: AuthService) { }

  ngOnInit(): void { }

  onSubmit(): void {
    this.auth.enviarCorreo(this.contact).subscribe(
      response => {
        console.log('Correo enviado', response);
      },
      error => {
        console.error('Error al enviar correo', error);
      }
    );
  }
}
