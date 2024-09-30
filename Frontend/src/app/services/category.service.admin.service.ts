import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Category } from '../interfaces/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceAdminService {

    private http = inject(HttpClient)
  private urlBase: string = "http://localhost:3000/api/category/"

  constructor() { }

  crearCategoria(objeto: Category, token: string): Observable<any> {
    const headers = new HttpHeaders().set('token', `${token}`);
    return this.http.post<any>(this.urlBase, objeto, { headers });
  }

  obtenerCategorias(): Observable<any> {
    return this.http.get<any>(this.urlBase);
  }

  eliminarCategoria(id: string, token: string): Observable<any> {
    const headers = new HttpHeaders().set('token', `${token}`);
    return this.http.delete<any>(`${this.urlBase}/${id}`, { headers });
  }
}
