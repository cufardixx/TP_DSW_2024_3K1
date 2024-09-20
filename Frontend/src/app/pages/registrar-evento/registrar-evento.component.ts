import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventServiceService } from '../../services/event.service.service';

@Component({
  selector: 'app-registrar-evento',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registrar-evento.component.html',
  styleUrl: './registrar-evento.component.css'
})
export class RegistrarEventoComponent {
  private AccesService = inject(EventServiceService);
  private router = inject(Router);
  public formBuild = inject(FormBuilder);

  public formRegistro: FormGroup = this.formBuild.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    date: ['', Validators.required],
    time: ['', Validators.required],
    location: ['', Validators.required],
    image: ['', Validators.required],
    price: ['', Validators.required],
  })


  
}
