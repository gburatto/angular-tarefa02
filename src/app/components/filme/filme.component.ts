import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Categoria } from '../../models/categoria';
import { Filme } from '../../models/filme';
import { FilmeService } from '../../services/filme.service';

@Component({
  selector: 'app-filme',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './filme.component.html',
  styleUrl: './filme.component.css'
})
export class FilmeComponent implements OnChanges {
  @Input({
    required: true,
  })
  categoria!: Categoria;
  public filmes: Filme[] = [];

  constructor(private filmeService: FilmeService) {}

  ngOnChanges(): void {
    if (this.categoria) {
      this.filmeService.getFilmesPorCategoria(this.categoria).subscribe(filmes => {
        this.filmes = filmes;
      });
    }
  }

  public getNomesCategorias(filme: Filme): string {
    return filme.categorias.map(c => c.nome).join(',\n');
  }
}
