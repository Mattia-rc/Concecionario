import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-all-vehicles',
  standalone: true,
  imports: [FormsModule,CommonModule,NavbarComponent, FooterComponent],
  templateUrl: './all-vehicles.component.html',
  styleUrl: './all-vehicles.component.css'
})
export class AllVehiclesComponent implements OnInit{

  publicVehicles: any[] = [];

  constructor(private auth:AuthService){ }
  ngOnInit(): void {
  this.auth.obtenerVehiculosPublicos().subscribe(
    data=>{
      this.publicVehicles = data
    }, error=>{
      console.error("el error en el front end de all vehicles es: ", error)
    }
  )
}
}
