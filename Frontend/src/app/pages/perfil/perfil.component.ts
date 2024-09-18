import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { AccesService } from '../../services/acces.service';
import { Router } from '@angular/router';
import { log } from 'console';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})


export class PerfilComponent implements OnInit {
  userProfile: any = {};

  constructor(private profileService: AccesService, private router: Router) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        this.profileService.getProfile(token).subscribe({
          next: (data) => {
            this.userProfile = data;
          },
          error: (err) => {
            console.error('Error al obtener el perfil:', err);
            this.router.navigate(['/login']); // Redirige a login si hay un error
          },
        });
      } else {
        this.router.navigate(['/login']); // Redirige a login si no hay token
      }
    }
  }

  editProfile() {
    this.router.navigate(['/editar-perfil']); // Asegúrate de configurar esta ruta en tu router
  }
}