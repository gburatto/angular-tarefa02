import { Injectable } from '@angular/core';
import { Filme } from '../models/filme';
import { map, Observable, ReplaySubject } from 'rxjs';
import { Categoria } from '../models/categoria';
import { IFilme } from '../interfaces/filme';

const IMAGE_NOT_FOUND = "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ=";
const FILMES: IFilme[] = [
  {
    "_id": 1,
    "titulo": "Beetlejuice",
    "diretor": "Tim Burton",
    "ano": 1988,
    "categorias": [
      {
        "_id": 1,
        "nome": "Comédia",
      },
      {
        "_id": 2,
        "nome": "Fantasia",
      },
    ],
    "atores": [
      "Alec Baldwin",
      "Geena Davis",
      "Annie McEnroe",
      "Maurice Page",
    ],
    "imagem": IMAGE_NOT_FOUND,
  },
  {
    "_id": 2,
    "titulo": "Indiana Jones e A Relíquia do Destino",
    "diretor": "James Mangold",
    "ano": 2023,
    "categorias": [
      {
        "_id": 5,
        "nome": "Aventura",
      },
      {
        "_id": 9,
        "nome": "Ação",
      },
    ],
    "atores": [
      "Harrison Ford",
      "Phoebe Waller-Bridge",
      "Mads Mikkelsen",
    ],
    "imagem": "https://br.web.img2.acsta.net/pictures/23/04/10/17/56/1153346.jpg",
  },
  {
    "_id": 3,
    "titulo": "Toy Story 2",
    "diretor": "John Lasseter",
    "ano": 1999,
    "categorias": [
      {
        "_id": 7,
        "nome": "Animação",
      },
      {
        "_id": 2,
        "nome": "Fantasia",
      },
      {
        "_id": 12,
        "nome": "Família",
      },
    ],
    "atores": [
      "Tom Hanks",
      "Tim Allen",
      "Joan Cusack",
    ],
    "imagem": "https://upload.wikimedia.org/wikipedia/pt/4/40/Movie_poster_toy_story_2.jpg",
  },
  {
    "_id": 4,
    "titulo": "Marley & Eu",
    "diretor": "David Frankel",
    "ano": 2008,
    "categorias": [
      {
        "_id": 4,
        "nome": "Drama",
      },
      {
        "_id": 1,
        "nome": "Comédia",
      },
    ],
    "atores": [
      "Owen Wilson",
      "Jennifer Aniston",
      "Eric Dane",
    ],
    "imagem": "https://upload.wikimedia.org/wikipedia/pt/0/09/Marley_Me_2008.jpg",
  },
  {
    "_id": 5,
    "titulo": "Tropa de Elite",
    "diretor": "José Padilha",
    "ano": 2007,
    "categorias": [
      {
        "_id": 9,
        "nome": "Ação",
      },
      {
        "_id": 4,
        "nome": "Drama",
      },
      {
        "_id": 15,
        "nome": "Suspense",
      },
      {
        "_id": 3,
        "nome": "Crime",
      },
    ],
    "atores": [
      "Wagner Moura",
      "Caio Junqueira",
      "André Ramiro",
    ],
    "imagem": "https://upload.wikimedia.org/wikipedia/pt/2/2a/TropaDeElitePoster.jpg",
  },
  {
    "_id": 6,
    "titulo": "Star Wars: A Ascensão Skywalker",
    "diretor": "J.J. Abrams",
    "ano": 2019,
    "categorias": [
      {
        "_id": 14,
        "nome": "Ficção Científica",
      },
      {
        "_id": 5,
        "nome": "Aventura",
      },
    ],
    "atores": [
      "Daisy Ridley",
      "Adam Driver",
      "Oscar Isaac",
    ],
    "imagem": "https://upload.wikimedia.org/wikipedia/pt/0/08/Star_Wars_The_Rise_of_Skywalker.jpg",
  },
  {
    "_id": 7,
    "titulo": "Como Se Fosse a Primeira Vez",
    "diretor": "Peter Segal",
    "ano": 2004,
    "categorias": [
      {
        "_id": 1,
        "nome": "Comédia",
      },
      {
        "_id": 10,
        "nome": "Romance",
      },
    ],
    "atores": [
      "Adam Sandler",
      "Drew Barrymore",
      "Rob Schneider",
    ],
    "imagem": "https://br.web.img3.acsta.net/pictures/20/11/23/14/35/4981975.jpg",
  },
];


@Injectable({
  providedIn: 'root'
})
export class FilmeService {

  private _filmes$ = new ReplaySubject<Filme[]>(1);
  public filmes$ = this._filmes$.asObservable();

  constructor() {
    this._filmes$.next(
      FILMES.map(f => new Filme(
        f.titulo,
        f.diretor,
        f.ano,
        f.categorias.map(c => new Categoria(
          c.nome,
        )),
        f.atores,
        f.imagem,
      )),
    );
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
