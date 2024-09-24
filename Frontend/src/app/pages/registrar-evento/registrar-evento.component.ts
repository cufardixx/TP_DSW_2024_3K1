import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventServiceService } from '../../services/event.service.service';
import { Evento } from '../../interfaces/event.js';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registrar-evento',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registrar-evento.component.html',
  styleUrls: ['./registrar-evento.component.css']  // Changed to styleUrls
})
export class RegistrarEventoComponent {
  private EventService = inject(EventServiceService);
  private router = inject(Router);
  public formBuild = inject(FormBuilder);
  public feedbackMessage: string = '';
  public feedbackSuccess: boolean = false;

  public formRegistroEvento: FormGroup = this.formBuild.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    date: ['', Validators.required],
    time: ['', Validators.required],
    location: ['', Validators.required],
    image: ['', Validators.required],
    price: ['', Validators.required],
    organizer: ['', Validators.required], 
    capacity: ['', Validators.required]    
  });

  createEvent() {
    const objeto: Evento = {
      user_id: this.formRegistroEvento.value.user_id,
      title: this.formRegistroEvento.value.title,
      description: this.formRegistroEvento.value.description,
      date: this.formRegistroEvento.value.date,
      time: this.formRegistroEvento.value.time,
      location: this.formRegistroEvento.value.location,
      image: this.formRegistroEvento.value.image,
      price: this.formRegistroEvento.value.price,
      organizer: this.formRegistroEvento.value.organizer,
      capacity: this.formRegistroEvento.value.capacity,
    };

    console.log(objeto);

    this.EventService.crearEvento(objeto).subscribe({
      next: (resp) => {
        this.mostrarFeedback('Evento creado con éxito', true);
        setTimeout(() => {
          this.router.navigate(['/profile']);
        }, 1050);
      },
      error: (err) => {

        console.error('Error creating event:', err);
      }
    });
  }

  private mostrarFeedback(mensaje: string, esExito: boolean) {
    this.feedbackMessage = mensaje;
    this.feedbackSuccess = esExito;
  }
}
