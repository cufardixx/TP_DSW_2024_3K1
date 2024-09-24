import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { PopularEventsComponent } from '../popular-events/popular-events.component';
import { CrearEventComponent } from '../crear-event/crear-event.component';
import { BuyTicketComponent } from '../buy-ticket/buy-ticket.component';
import { FooterComponent } from '../footer/footer.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { EventServiceService } from '../../services/event.service.service';
import { FormsModule } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [HeaderComponent, PopularEventsComponent, CrearEventComponent, BuyTicketComponent, FooterComponent, CommonModule, FormsModule, AsyncPipe],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  constructor(private eventService: EventServiceService, private router: Router) {}

  src: string = '';
  public data: any;

  buscarEventos(): void {
    this.data = this.eventService.searchEventsByName(this.src).pipe(
      map((response: any) => response.slice(0, 5))
    );
  }

  navigateToEvent(id: string): void {
    this.router.navigate(['/event', id]);
  }
}
