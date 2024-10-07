import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private router = inject(Router)


  redirectToLogin(): void {
    this.router.navigate(['/login']);
  }

  redirectToRegister(): void {
    this.router.navigate(['/register']);
  }


   isLoggedIn = typeof localStorage !== 'undefined' && localStorage.getItem('token') !== null;


  crearEvento(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/create-event']);
    } else {
      this.router.navigate(['/login']);
    }
  }


  
}
