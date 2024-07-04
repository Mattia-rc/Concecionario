import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule, RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  implements OnInit{

  constructor(private auth:AuthService, private router:Router) { }

ngOnInit(): void {
  
}


onSubmit(form:NgForm):void{
  const {username, email, password} = form.value;

  console.log("datos login", {username, email, password})

  if(username&&email&&password){
    this.auth.login({username, email, password}).subscribe(
      res=>{
        console.log("logueado correctgamente", res)
        this.router.navigate(['/vista_Admin'])
      }
    )
  }

}
}
