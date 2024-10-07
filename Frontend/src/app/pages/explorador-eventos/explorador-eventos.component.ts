import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { EventServiceService } from '../../services/event.service.service';
import { Evento } from '../../interfaces/event';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-explorador-eventos',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './explorador-eventos.component.html',
  styleUrl: './explorador-eventos.component.css'
})
export class ExploradorEventosComponent {
  private router: Router = inject(Router);
  private eventoService: EventServiceService = inject(EventServiceService);
  eventos: Evento[] = [];



  ngOnInit(): void {
    this.eventoService.obtenerEventos().subscribe((eventos) => {
      this.eventos = eventos;
    })
  }

  



  verEvento(id: number): void {
    this.router.navigate([`event/${id}`]);
  }


  crearEvento(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/create-event']);
    } else {
      this.router.navigate(['/login']);
    }
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

}
