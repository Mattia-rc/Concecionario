import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
@Component({
  selector: 'app-view-cars',
  standalone: true,
  imports: [FormsModule, CommonModule,RouterLink,NavbarComponent],
  templateUrl: './view-cars.component.html',
  styleUrl: './view-cars.component.css'
})
export class ViewCarsComponent implements OnInit {

  dataAll: any[] = [];
  usuario:any;
  constructor(private auth:AuthService ){ }

  ngOnInit(): void {
    this.loadVehicles()
    this.obtenerUsuario()
}
loadVehicles():void{
  this.auth.obtenerVehiculos().subscribe(
    data=>{

      this.dataAll = data
      console.log("la data del frontend es: ", this.dataAll)
    },error=>{
      console.error("error al cargar datos de autos frontend", error)
    }
  )
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






eliminarVehiculos(id:String):void{
  this.auth.deleteVehiculo(id).subscribe(
    ()=>{
      this.dataAll = this.dataAll.filter(vehiculos=>vehiculos._id !== id)
      console.log("vehiculo eliminado correctamente");
    }, error=>{
      console.error('error al eliminar vehiculo', error)
    }
  )
}

}

