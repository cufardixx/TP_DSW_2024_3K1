import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccesService } from '../../services/acces.service';
import { Router } from '@angular/router';
import { UsuarioEdit } from '../../interfaces/UsuarioEdit';

@Component({
  selector: 'app-prefil-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './prefil-edit.component.html',
  styleUrl: './prefil-edit.component.css'
})
export class PrefilEditComponent implements OnInit {
  private AccesService = inject(AccesService);
  private router = inject(Router);
  public formBuild = inject(FormBuilder);
  
  public formEditarPerfil: FormGroup = this.formBuild.group({
    email: ['', [Validators.required, Validators.email]],
    firstname: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    password: ['', [Validators.minLength(6)]],
    phone: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    location: ['', [Validators.required]],
    birth: ['', [Validators.required]],
  });

  private userId: string | null = null;

  ngOnInit(): void {
    this.cargarDatosUsuario();
  }

  cargarDatosUsuario(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.AccesService.getProfile(token).subscribe({
        next: (data) => {
          this.userId = data.id;  // Almacena el ID del usuario
          this.formEditarPerfil.patchValue({
            email: data.email,
            firstname: data.firstname,
            lastname: data.lastname,
            phone: data.phone,
            location: data.location,
            birth: data.birth
          });
        },
        error: (err) => {
          console.error('Error al obtener el perfil:', err);
          this.router.navigate(['/login']);
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  actualizarPerfil() {
    if (this.formEditarPerfil.valid && this.userId) { // Asegurarse de que el userId esté disponible
      const objeto: UsuarioEdit = {
        id: Number(this.userId),  // Incluye el ID del usuario en el objeto a enviar
        email: this.formEditarPerfil.value.email,
        firstname: this.formEditarPerfil.value.firstname,
        lastname: this.formEditarPerfil.value.lastname,
        password: this.formEditarPerfil.value.password,
        phone: this.formEditarPerfil.value.phone.toString(),
        location: this.formEditarPerfil.value.location,
        birth: this.formEditarPerfil.value.birth,
        imgPerfil: this.formEditarPerfil.value.imgPerfil
      };

      const token = localStorage.getItem('token');
      if (token) {
        this.AccesService.update(objeto).subscribe({
          next: (response) => {
            console.log('Usuario Actualizado:', response);
            this.router.navigate(['/profile']);
          },
          error: (error) => {
            console.error('Error al actualizar el usuario:', error);
          }
        });
      } else {
        this.router.navigate(['/login']);
      }
    } else {
      Object.values(this.formEditarPerfil.controls).forEach(control => {
        if (control.invalid) {
          control.markAsTouched();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
