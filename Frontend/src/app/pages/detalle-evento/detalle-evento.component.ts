import { Component, inject, Input, OnInit } from '@angular/core';
import { EventServiceService } from '../../services/event.service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AccesService } from '../../services/acces.service';

@Component({
  selector: 'app-detalle-evento',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-evento.component.html',
  styleUrl: './detalle-evento.component.css'
})
export class DetalleEventoComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private eventoService = inject(EventServiceService);
  private accesService = inject(AccesService);
  private eventId: string | null = null;
  
  isLoggedIn = false;
  user: any;
  evento: any;
  imgPerfil: string | null = null;

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      this.isLoggedIn = localStorage.getItem('token') !== null;
    }

    this.eventId = this.route.snapshot.paramMap.get('id');
    
    if (this.eventId) {
      this.eventoService.obtenerEvento(Number(this.eventId)).subscribe((evento) => {
        this.evento = evento;
        this.obtenerImagenUsuario(evento.user_id)
      });
    }
  }

  obtenerImagenUsuario(userId: number): void {
    this.accesService.obtenerImagenUsuario(userId).subscribe(
      (user) => {
        this.user = user;
        this.imgPerfil = user.imgPerfil;
      },
      (error) => {
        console.error('Error al obtener la imagen del usuario:', error);
      }
    );
  }

  reservarEntrada(eventId: number): void {
    this.router.navigate([`/ticket/${eventId}`]);
  }
 
}
