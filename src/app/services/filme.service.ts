import { inject, Injectable } from '@angular/core';
import { Filme } from '../models/filme';
import { map, Observable, ReplaySubject } from 'rxjs';
import { Categoria } from '../models/categoria';
import { IFilme } from '../interfaces/filme';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class FilmeService {

  private httpClient = inject(HttpClient);

  private _filmes$ = new ReplaySubject<Filme[]>(1);
  public filmes$ = this._filmes$.asObservable();

  constructor() {
    this.httpClient.get<IFilme[]>('http://localhost:3000/api/filmes').pipe(
      map(filmes => filmes.map(f => new Filme(
        f.titulo,
        f.diretor,
        f.ano,
        f.categorias.map(c => new Categoria(
          c.nome,
        )),
        f.atores,
        f.imagem,
      ))),
    ).subscribe(this._filmes$);
  }

  public getFilmesPorCategoria(categoria: Categoria): Observable<Filme[]> {
    return this.filmes$.pipe(
      map(filmes => {
        console.log(`Filtrando filmes para a categoria: ${categoria.nome}`);
        const filmesFiltrados = filmes.filter(filme =>
          filme.categorias.some(c => {
            const match = c.nome === categoria.nome;
            console.log(`Comparando ${c.nome} com ${categoria.nome}: ${match}`);
            return match;
          })
        );
        console.log('Filmes encontrados:', filmesFiltrados);
        return filmesFiltrados;
      })
    );
  }

  public getNomesCategorias(filme: Filme): string {
    return filme.categorias.map(c => c.nome).join(',\n');
  }
}
