import { HttpClient,HttpParams  } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

private baseUrl = `http://localhost:7000/api`


  constructor(private http: HttpClient) { }


  register(data:any):Observable<any>{
    console.log("la data es: ", data);
    return this.http.post(`${this.baseUrl}/register`, data, {responseType:'text'})
  }

  login(data:any):Observable<any>{
    console.log("la data es: ", data)
    return this.http.post(`${this.baseUrl}/login`, data, {withCredentials:true})
  }


  createVehiculo(data: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/vista_create_vehicle`, data, { responseType: 'text', withCredentials: true });
}
  
  obtenerVehiculosPublicos(filtros: any = {}): Observable<any> {
    let params = new HttpParams();
    Object.keys(filtros).forEach(key => {
      if (filtros[key] !== '' && filtros[key] !== null) {
        params = params.set(key, filtros[key]);
      }
    });
    return this.http.get(`${this.baseUrl}/`, { params, withCredentials: true });
  }

  obtenerVehiculos():Observable<any>{
    return this.http.get(`${this.baseUrl}/vista_viewAll`, {withCredentials:true})
  }
  obtenerUsuario():Observable<any>{
    console.log("algo se llamo en obtener usuario")
    return this.http.get(`${this.baseUrl}/vista_Admin`, {withCredentials:true})
  }
  
  deleteVehiculo(id:String):Observable<any>{
    return this.http.delete(`${this.baseUrl}/vehiculo/${id}`, {withCredentials:true, responseType:'text'})
  }

  updateVehiculo(id:String, data:any):Observable<any>{
    return this.http.put(`${this.baseUrl}/vehiculo/${id}`, data, {withCredentials:true, responseType:'text'})
  }

  obtenerVehicleSolo(id:string):Observable<any>{
    return this.http.get(`${this.baseUrl}/vehiculo/${id}`,{withCredentials:true})
  }



}
