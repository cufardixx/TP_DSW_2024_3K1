import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventServiceService } from '../../services/event.service.service';
import { Evento } from '../../interfaces/event.js';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-evento',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './editar-evento.component.html',
  styleUrl: './editar-evento.component.css'
})


export class EditarEventoComponent {
  private EventService = inject(EventServiceService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  public formBuild = inject(FormBuilder);

  public formEditarEvento: FormGroup = this.formBuild.group({
    title: [''],
    description: [''],
    date: [''],
    time: [''],
    location: [''],
    image: [''],
    price: [''],
    organizer: [''], 
    capacity: ['']   
  });

  private eventId: string | null = null;

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('id');
    if (this.eventId) {
      this.cargarDatosEvento();
    }
  }

  cargarDatosEvento() {
    this.EventService.obtenerEvento(Number(this.eventId)).subscribe({
      next: (evento: Evento) => {
        this.formEditarEvento.patchValue({
          title: evento.title,
          description: evento.description,
          date: evento.date,
          time: evento.time,
          location: evento.location,
          image: evento.image,
          price: evento.price,
          organizer: evento.organizer,
          capacity: evento.capacity
        });
      },
      error: (err: any) => {
        console.error('Error al cargar los datos del evento:', err);
      }
    });
  }

  updateEvent() {
    const objeto: Evento = {
      title: this.formEditarEvento.value.title,
      description: this.formEditarEvento.value.description,
      date: this.formEditarEvento.value.date,
      time: this.formEditarEvento.value.time,
      location: this.formEditarEvento.value.location,
      image: this.formEditarEvento.value.image,
      price: this.formEditarEvento.value.price,
      organizer: this.formEditarEvento.value.organizer,
      capacity: this.formEditarEvento.value.capacity,
    };

    console.log(objeto);

    if (this.eventId !== null) {
      this.EventService.actualizarEvento(Number(this.eventId), objeto).subscribe({
        next: (resp) => {
          console.log('Evento Actualizado:', resp);
          this.router.navigate(['/my-events']);
        },
        error: (err) => {

        console.error('Error creating event:', err);
      }
    });
  }
}
}
