import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventServiceService } from '../../services/event.service.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TicketServiceService } from '../../services/ticket.service.service';
import { Ticket } from '../../interfaces/ticket';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  public formBuild = inject(FormBuilder);
  private eventoService = inject(EventServiceService);
  private ticketService = inject(TicketServiceService);
 

  private eventId: string | null = null;
  evento: any;
  ticketQuantity: number = 1;
  total: number = 0;


  public formCheckout: FormGroup = this.formBuild.group({
    quantity: ['', Validators.required]
  });

  showMessage: boolean = false;
  message: string = '';

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('id');

    if (this.eventId) {
      this.eventoService.obtenerEvento(Number(this.eventId)).subscribe((evento) => {
        this.evento = evento;
      });
    }
  }

  

  comprarTickets() {
    const token = localStorage.getItem('token');
    const cantidadDeTickets = this.formCheckout.value.quantity;
    if (token && this.eventId) {
      this.ticketService.comprarTicket({ cantidad: cantidadDeTickets }, Number(this.eventId), token)
        .subscribe(
        response => {
          console.log('Boletos comprados:', response);
        },
        error => {
          console.error('Error al comprar tickets:', error);
        }
      );
    }
  }

  


  crearEvento(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/create-event']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  mostrarMensaje() {
    this.showMessage = true;
    this.message = '¡Compra realizada con éxito!';
    setTimeout(() => {
      this.showMessage = false;
    }, 5000); 
  }
}
