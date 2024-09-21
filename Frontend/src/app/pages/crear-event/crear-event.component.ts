import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-event',
  standalone: true,
  imports: [],
  templateUrl: './crear-event.component.html',
  styleUrl: './crear-event.component.css'
})
export class CrearEventComponent {

  constructor(private router: Router) { }

  
  crearEvento():void{
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/create-event']);
    } else {
      this.router.navigate(['/login']);
    }
  }

}
