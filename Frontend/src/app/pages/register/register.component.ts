import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccesService } from '../../services/acces.service';
import { Router } from '@angular/router';
import { Usuario } from '../../interfaces/Usuario';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})


export class RegisterComponent {
  errorMessages: string[] = [];
  private AccesService = inject(AccesService);
  private router = inject(Router);
  public formBuild = inject(FormBuilder);

  public formRegistro: FormGroup = this.formBuild.group({
    email: ['', [Validators.required, Validators.email]],
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
    phone: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    location: ['', Validators.required],
    birth: ['', Validators.required],
  });

  registrarse() {
    if (this.formRegistro.valid){
      
      if (this.formRegistro.invalid) return;

    const objeto: Usuario = {
      email: this.formRegistro.value.email,
      firstname: this.formRegistro.value.firstname,
      lastname: this.formRegistro.value.lastname,
      password: this.formRegistro.value.password,
      phone: this.formRegistro.value.phone.toString(),
      location: this.formRegistro.value.location,
      birth: this.formRegistro.value.birth
    };

    console.log(objeto);
    
    

      this.AccesService.registrarse(objeto).subscribe({
        next: (response) => {
          console.log('Usuario registrado:', response);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.errorMessages = error;
        }
      });
    } else {
      Object.values(this.formRegistro.controls).forEach(control => {
        if (control.invalid) {
          control.markAsTouched();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
