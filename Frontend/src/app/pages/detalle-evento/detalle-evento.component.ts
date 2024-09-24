import { Component, inject, Input } from '@angular/core';
import { EventServiceService } from '../../services/event.service.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle-evento',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-evento.component.html',
  styleUrl: './detalle-evento.component.css'
})
export class DetalleEventoComponent {

  private route = inject(ActivatedRoute);
  private eventoService = inject(EventServiceService);
  private eventId: string | null = null;
  

  ngOnInit(): void {

    if (typeof localStorage !== 'undefined') {
      this.isLoggedIn = localStorage.getItem('token') !== null;
    }

    this.eventId = this.route.snapshot.paramMap.get('id');
    
    if (this.eventId) {
      this.eventoService.obtenerEvento(Number(this.eventId)).subscribe((evento) => {
        this.evento = evento;
      });
    }
  }

  isLoggedIn = false;

 

  evento: any; // Definir la propiedad evento
}
