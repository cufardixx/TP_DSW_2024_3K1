import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Categoria } from '../interfaces/categoria';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {

  

  private http = inject(HttpClient)
  private urlBase: string = "http://localhost:3000/api/category/"
  constructor() { }

  cargarCategoria(objeto: string){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('token', `${token}`);
    return this.http.post(`${this.urlBase}new`, objeto, {headers})
  }

  getCategories(): Observable<Categoria[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('token', `${token}`);
    return this.http.get<Categoria[]>(`${this.urlBase}`, { headers });
  }

  deleteCategory(id: number): Observable<Categoria>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('token', `${token}`);
    return this.http.delete<Categoria>(`${this.urlBase}${id}`,{headers});
  }

}
