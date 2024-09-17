import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AccesService } from '../../services/acces.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Login } from '../../interfaces/Login';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent {
  private AccesService = inject(AccesService);
  private router = inject(Router);
  public formBuild = inject(FormBuilder);

  public formLogin: FormGroup = this.formBuild.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  iniciarSesion() {
    if (this.formLogin.invalid) return;
  
    const objeto: Login = {
      email: this.formLogin.value.email,
      password: this.formLogin.value.password
    };
  
    this.AccesService.login(objeto).subscribe({
      next: (response) => {
        //console.log('Respuesta del servidor:', response);
        localStorage.setItem("token", response.token);
        this.router.navigate(['/profile']);
      },
      error: (error) => {
        console.error('Error al iniciar sesión:', error);
      }
    });
  }
}