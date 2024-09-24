import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { PopularEventsComponent } from '../popular-events/popular-events.component';
import { CrearEventComponent } from '../crear-event/crear-event.component';
import { BuyTicketComponent } from '../buy-ticket/buy-ticket.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { EventServiceService } from '../../services/event.service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [HeaderComponent, PopularEventsComponent,CrearEventComponent,BuyTicketComponent, FooterComponent, CommonModule, FormsModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  constructor(private eventService: EventServiceService) {}

  terminoBusqueda: string = '';
  events: any[] = [];
  errorMessage: string = '';

  buscarEventos() {
    if (this.terminoBusqueda.trim()) {
      this.eventService.searchEventsByName(this.terminoBusqueda).subscribe({
        next: (data) => {
          this.events = data;
          this.errorMessage = '';
        },
        error: (err) => {
          if (err.status === 404) {
            this.events = [];
            this.errorMessage = 'No se encontraron eventos';
          } else {
            this.errorMessage = 'Error al buscar eventos';
          }
        }
      });
    } else {
      this.errorMessage = 'Por favor ingrese un término de búsqueda';
    }
  }
}
