import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit{
publicVehiculos:any;
constructor(private auth:AuthService) {}

ngOnInit(): void {
  this.auth.obtenerVehiculosPublicos().subscribe(
    data=>{
      this.publicVehiculos = data
    },error=>{
      console.error("error al obtener datos en el footer", error)
    }
  )
}

}
