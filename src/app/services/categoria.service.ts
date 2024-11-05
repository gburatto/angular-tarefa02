import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Categoria } from '../models/categoria';

const CATEGORIAS = [
  {
    "_id": 1,
    "nome": "Comédia",
  },
  {
    "_id": 2,
    "nome": "Fantasia",
  },
  {
    "_id": 3,
    "nome": "Crime",
  },
  {
    "_id": 4,
    "nome": "Drama",
  },
  {
    "_id": 5,
    "nome": "Aventura",
  },
  {
    "_id": 6,
    "nome": "Terror",
  },
  {
    "_id": 7,
    "nome": "Animação",
  },
  {
    "_id": 8,
    "nome": "Mistério",
  },
  {
    "_id": 9,
    "nome": "Ação",
  },
  {
    "_id": 10,
    "nome": "Romance",
  },
];

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private _categorias$ = new ReplaySubject<Categoria[]>(1);
  public categorias$ = this._categorias$.asObservable();

  constructor() {
    this._categorias$.next(
      CATEGORIAS.map(c => new Categoria(
        c.nome,
      )),
    );
  }
}
