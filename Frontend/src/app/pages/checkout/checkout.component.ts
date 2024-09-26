import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventServiceService } from '../../services/event.service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TicketServiceService } from '../../services/ticket.service.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private eventoService = inject(EventServiceService);
  private ticketService = inject(TicketServiceService);
  //private accesService = inject(AccesService);
  private eventId: string | null = null;
  evento: any;
  ticketQuantity: number = 1;
  total: number = 0;

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('id');

    if (this.eventId) {
      this.eventoService.obtenerEvento(Number(this.eventId)).subscribe((evento) => {
        this.evento = evento;
        this.updateTotal();
      });
    }
  }

  updateTotal(): void {
    this.total = this.evento.price * this.ticketQuantity;
  }

  crearEvento(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/create-event']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  procederConLaCompra(eventId: number): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.ticketService.comprarTicket(eventId, token).subscribe(
        (ticket) => {
          console.log('Ticket comprado:', ticket);
          // Lógica adicional después de una compra exitosa
        },
        (error) => {
          console.error('Error al comprar el ticket:', error);
          // Manejo de errores
        }
      );
    } else {
      console.error('No hay token disponible');
      this.router.navigate(['/login']);
    }
  }

}
