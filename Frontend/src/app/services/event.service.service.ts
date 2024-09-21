import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Evento } from '../interfaces/event';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EventServiceService {

  private http = inject(HttpClient);
  private urlBase: string = "http://localhost:3000/api/event/";

  constructor() { }

  crearEvento(objeto: Evento): Observable<Evento> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('token', `${token}`);

    return this.http.post<Evento>(`${this.urlBase}new`, objeto, { headers });
  }

  obtenerEventosUsuario(): Observable<Evento[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('token', `${token}`);

    return this.http.get<Evento[]>(`${this.urlBase}`, { headers });
  }
}


