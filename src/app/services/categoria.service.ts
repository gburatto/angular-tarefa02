import { inject, Injectable } from '@angular/core';
import { map, ReplaySubject } from 'rxjs';
import { Categoria } from '../models/categoria';
import { HttpClient } from '@angular/common/http';
import { ICategoria } from '../interfaces/categoria';



@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private httpClient = inject(HttpClient);

  private _categorias$ = new ReplaySubject<Categoria[]>(1);
  public categorias$ = this._categorias$.asObservable();

  private _categoriaSelecionada$ = new ReplaySubject<Categoria>(1);
  public categoriaSelecionada$ = this._categoriaSelecionada$.asObservable();

  constructor() {
    this.httpClient.get<ICategoria[]>('http://localhost:3000/api/categorias').pipe(
      map(categorias => categorias.map(c => new Categoria(
        c.nome,
      ))),
    ).subscribe(this._categorias$);
  }

  public selecionaCategoria(c: Categoria): void {
    this._categoriaSelecionada$.next(c);
  }
}
