import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Usuario } from '../interfaces/Usuario';
import { Observable } from 'rxjs';
import { ResponseAcceso } from '../interfaces/ResponseAcceso';
import { Login } from '../interfaces/Login';

@Injectable({
  providedIn: 'root'
})
export class AccesService {

  private http = inject(HttpClient)
  private urlBase: string = "http://localhost:3000/api/user/"
  constructor() { }

  registrarse(objeto: Usuario){
    return this.http.post(`${this.urlBase}register`, objeto)
  }

  login(objeto: Login): Observable<ResponseAcceso> {
    return this.http.post<ResponseAcceso>(`${this.urlBase}login`, objeto)
  }

  getProfile(token: string): Observable<any> {
    const headers = new HttpHeaders().set('token', `${token}`);
    return this.http.get(`${this.urlBase}profile`, { headers });
  }

  updateProfile(token: string, userId: number, userData: any) {
    const headers = { 'token': `${token}`, 'Content-Type': 'application/json' };
    return this.http.put(`${this.urlBase}/${userId}`, userData, { headers });
  }


}
