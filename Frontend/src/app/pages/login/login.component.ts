import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AccesService } from '../../services/acces.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Login } from '../../interfaces/Login';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent {
  private AccesService = inject(AccesService);
  private router = inject(Router);
  public formBuild = inject(FormBuilder);


  public formLogin: FormGroup = this.formBuild.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  iniciarSesion() {
    if (this.formLogin.valid) {
      const objeto: Login = {
        email: this.formLogin.value.email,
        password: this.formLogin.value.password
      };

      this.AccesService.login(objeto).subscribe({
        next: (response) => {
          this.mostrarFeedback('Sesión iniciada con éxito!', true);
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 900);
          localStorage.setItem("token", response.token);
        },
        error: (error) => {
          this.mostrarFeedback('Error al iniciar sesión', false)
        }
      });
    } else {
      this.formLogin.markAllAsTouched();
    }
  }

  private mostrarFeedback(mensaje: string, esExito: boolean) {
    this.feedbackMessage = mensaje;
    this.feedbackSuccess = esExito;
  }
  feedbackMessage = '';
  feedbackSuccess = false;


}