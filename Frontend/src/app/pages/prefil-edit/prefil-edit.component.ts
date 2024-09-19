import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccesService } from '../../services/acces.service';
import { Router } from '@angular/router';
import { UsuarioEdit } from '../../interfaces/UsuarioEdit';

@Component({
  selector: 'app-prefil-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './prefil-edit.component.html',
  styleUrl: './prefil-edit.component.css'
})
export class PrefilEditComponent implements OnInit {
  private AccesService = inject(AccesService);
  private router = inject(Router);
  public formBuild = inject(FormBuilder);

  public formEditarPerfil: FormGroup = this.formBuild.group({
    imgPerfil: [''],
    firstname: [''],
    lastname: [''],
    phone: ['',[Validators.pattern('[0-9]+')]],
    location: [''],
    birth: [''],
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
            imgPerfil: data.imgPerfil,
            firstname: data.firstname,
            lastname: data.lastname,
            phone: data.phone,
            location: data.location,
            birth: data.birth,
          });
        },
      });
    }
  }

  actualizarPerfil() {
    if (this.userId) { // Asegurarse de que el userId esté disponible
      const objeto: UsuarioEdit = {
        id: Number(this.userId),  
        firstname: this.formEditarPerfil.value.firstname,
        lastname: this.formEditarPerfil.value.lastname,
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
    } 
  }
}
