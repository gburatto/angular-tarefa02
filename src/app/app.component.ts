import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { ListaCategoriasComponent } from './components/lista-categorias/lista-categorias.component';
import { CategoriaService } from './services/categoria.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    CategoriaComponent,
    ListaCategoriasComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  public categoriaService = inject(CategoriaService);
}
