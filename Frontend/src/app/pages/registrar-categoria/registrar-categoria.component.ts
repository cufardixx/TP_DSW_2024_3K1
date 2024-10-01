import { Component, inject, OnInit } from '@angular/core';
import { CategoryServiceAdminService } from '../../services/category.service.admin.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-categoria',
  standalone: true,
  imports: [CommonModule, FormsModule ],
  templateUrl: './registrar-categoria.component.html',
  styleUrl: './registrar-categoria.component.css'
})
export class RegistrarCategoriaComponent implements OnInit {
  categorias: any[] = [];
  private categoriaService = inject(CategoryServiceAdminService);
  private router = inject(Router);
  public formBuild = inject(FormBuilder);

  public formCategoria: FormGroup | undefined;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formCategoria = this.fb.group({
      name: ['', Validators.required]
    });
    this.obtenerCategorias();
  }

  crearCategoria(): void {
    const token = localStorage.getItem('token');
    if (token) {
      if (this.formCategoria?.valid) {
        const categoria = this.formCategoria.value;
        this.categoriaService.crearCategoria(categoria, token).subscribe({
          next: () => {
            if (categoria) {
              this.categorias.push(categoria);
            }
            this.formCategoria?.reset();
            this.obtenerCategorias(); // Actualizar la lista después de crear
          },
          error: (error) => {
            console.error('Error al crear categoría:', error);
            // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje al usuario
          }
        });
      } else {
        console.error('El formulario no es válido');
        // Marcar los campos como tocados para mostrar los errores
        this.formCategoria?.markAllAsTouched();
      }
    } else {
      console.error('No se encontró el token');
      this.router.navigate(['/login']); // Redirigir al login si no hay token
    }
  }

  obtenerCategorias(): void {
    this.categoriaService.obtenerCategorias().subscribe({
      next: (data: any) => {
        this.categorias = data;
      },
      error: (error) => {
        console.error('Error al obtener categorías:', error);
      }
    });
  }

  borrarCategoria(id: string): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.categoriaService.eliminarCategoria(id, token).subscribe({
        next: () => {
          this.categorias = this.categorias.filter((categoria) => categoria.id !== id);
        },
        error: (error) => {
          console.error('Error al eliminar categoría:', error);
        }
      });
    } else {
      console.error('No se encontró el token');
      this.router.navigate(['/login']); // Redirigir al login si no hay token
    }
  }
}
