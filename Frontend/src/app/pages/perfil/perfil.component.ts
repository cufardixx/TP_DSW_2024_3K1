import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { AccesService } from '../../services/acces.service';
import { Router } from '@angular/router';
import { EventServiceService } from '../../services/event.service.service';
import { Evento } from '../../interfaces/event.js';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})


export class PerfilComponent implements OnInit {
  userProfile: any = {};

  constructor(private profileService: AccesService, private router: Router, private eventoService: EventServiceService) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        this.profileService.getProfile(token).subscribe({
          next: (data) => {
            console.log(data);
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
    this.router.navigate([`/profile/${this.userProfile.id}`]); // Asegúrate de configurar esta ruta en tu router
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  misEventos() {
    this.eventoService.obtenerEventosUsuario().subscribe(
      (eventos) => {
        if (eventos.length > 0) {
          this.router.navigate(['/my-events']);
        } else {
          // Si no tiene eventos, redirigir a la página de creación
          this.router.navigate(['/create-event']);
        }
      },
      (error) => {
        console.error('Error al obtener eventos:', error);
        // En caso de error, redirigir a la página de creación por defecto
        this.router.navigate(['/create-event']);
      }
    );
  }


  crearEvento(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/create-event']);
    } else {
      this.router.navigate(['/login']);
    }
  }

}