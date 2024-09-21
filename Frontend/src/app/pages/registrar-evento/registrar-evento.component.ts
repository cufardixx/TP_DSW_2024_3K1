import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventServiceService } from '../../services/event.service.service';
import { Evento } from '../../interfaces/event.js';

@Component({
  selector: 'app-registrar-evento',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registrar-evento.component.html',
  styleUrls: ['./registrar-evento.component.css']  // Changed to styleUrls
})
export class RegistrarEventoComponent {
  private EventService = inject(EventServiceService);
  private router = inject(Router);
  public formBuild = inject(FormBuilder);

  public formRegistroEvento: FormGroup = this.formBuild.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    date: ['', Validators.required],
    time: ['', Validators.required],
    location: ['', Validators.required],
    image: ['', Validators.required],
    price: ['', Validators.required],
    organizer: ['', Validators.required], // Added this line
    capacity: ['', Validators.required]    // Added this line
  });

  createEvent() {
    const objeto: Evento = {
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
        this.router.navigate(['/perfil']);
      },
      error: (err) => {

        console.error('Error creating event:', err);
        // Optionally show an error message to the user
      }
    });
  }
}
