import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    
  }

  onSubmit(form:NgForm):void{
    const {email, username, password} = form.value

    if(email && username && password){
      console.log("los datos que llegaron del registro son: ", {email,username,password})
      this.authService.register({email, username, password}).subscribe(
        res=>{
          console.log("register Exitoso", res)
        },
        error=>{
          console.error("error al registrar el usuario", error)
        }
      )
    }else{
      console.log("se requiere todos los campos para el register")
    }

  }

}
