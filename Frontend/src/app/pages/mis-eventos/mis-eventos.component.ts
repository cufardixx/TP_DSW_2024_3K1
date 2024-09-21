import { Component, inject, OnInit } from '@angular/core';
import { EventServiceService } from '../../services/event.service.service';
import { Evento } from '../../interfaces/event';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mis-eventos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mis-eventos.component.html',
  styleUrl: './mis-eventos.component.css'
})
export class MisEventosComponent implements OnInit {

  private router = inject(Router);

  
  eventos: Evento[] = [];

  constructor(private eventoService: EventServiceService) {}

  ngOnInit(): void {
    this.eventoService.obtenerEventosUsuario().subscribe(
      (eventos) => {
        this.eventos = eventos;
      },
      (error) => {
        console.error('Error al obtener eventos:', error);
      }

    );
  }





}


