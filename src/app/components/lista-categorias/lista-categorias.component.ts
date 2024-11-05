import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../models/categoria';

@Component({
  selector: 'app-lista-categorias',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './lista-categorias.component.html',
  styleUrl: './lista-categorias.component.css'
})
export class ListaCategoriasComponent {
  public categoriaService = inject(CategoriaService);
}
