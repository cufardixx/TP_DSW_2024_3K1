import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Evento } from '../interfaces/event';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EventServiceService {

  private http = inject(HttpClient)
  private urlBase: string = "http://localhost:3000/api/event/"
  constructor() { }

  crearEvento(objeto: Evento): Observable<Evento> {
    return this.http.post<Evento>(`${this.urlBase}new`, objeto)
  }
}
