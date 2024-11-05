import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { EventServiceService } from '../../services/event.service.service';
import { Evento } from '../../interfaces/event';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import {CategoryServiceService} from '../../services/category.service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-explorador-eventos',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FormsModule],
  templateUrl: './explorador-eventos.component.html',
  styleUrl: './explorador-eventos.component.css'
})
export class ExploradorEventosComponent {
  private router: Router = inject(Router);
  private eventoService: EventServiceService = inject(EventServiceService);
  private categoryService: CategoryServiceService = inject(CategoryServiceService);
  eventos: Evento[] = [];
  categorias: string[] = [];
  eventosFiltrados : Evento[]= [];
  categoriaSeleccionada: string = '';

  obtenerCategorias(){
    this.categoryService.getCategories().subscribe((categorias) => {
      this.categorias = categorias.map(categoria => categoria.name);
    })
  }

  filtrarEventos() {
    if (this.categoriaSeleccionada) {
      this.eventosFiltrados = this.eventos.filter(evento => evento.categoria_name === this.categoriaSeleccionada);
    } else {
      this.eventosFiltrados = this.eventos;
    }
  }

  ngOnInit(): void {
    this.eventoService.obtenerEventos().subscribe((eventos) => {
      this.eventos = eventos;
    })

    this.eventosFiltrados = this.eventos;
    this.obtenerCategorias();
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