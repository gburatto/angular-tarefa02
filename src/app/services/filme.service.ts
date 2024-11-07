import { Injectable } from '@angular/core';
import { Filme } from '../models/filme';
import { map, Observable, ReplaySubject } from 'rxjs';
import { Categoria } from '../models/categoria';

const IMAGE_NOT_FOUND = "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ=";
const FILMES = [
  {
    "titulo": "Beetlejuice",
    "diretor": "Tim Burton",
    "ano": 1988,
    "categorias": [
      {
        "nome": "Comédia",
      },
      {
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
    "titulo": "Indiana Jones e A Relíquia do Destino",
    "diretor": "James Mangold",
    "ano": 2023,
    "categorias": [
      {
        "nome": "Aventura",
      },
      {
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
    "titulo": "Toy Story 2",
    "diretor": "John Lasseter",
    "ano": 1999,
    "categorias": [
      {
        "nome": "Animação",
      },
      {
        "nome": "Fantasia",
      },
      {
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
    "titulo": "Marley & Eu",
    "diretor": "David Frankel",
    "ano": 2008,
    "categorias": [
      {
        "nome": "Drama",
      },
      {
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
    "titulo": "Tropa de Elite",
    "diretor": "José Padilha",
    "ano": 2007,
    "categorias": [
      {
        "nome": "Ação",
      },
      {
        "nome": "Drama",
      },
      {
        "nome": "Suspense",
      },
      {
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
    "titulo": "Star Wars: A Ascensão Skywalker",
    "diretor": "J.J. Abrams",
    "ano": 2019,
    "categorias": [
      {
        "nome": "Ficção Científica",
      },
      {
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
    "titulo": "Como Se Fosse a Primeira Vez",
    "diretor": "Peter Segal",
    "ano": 2004,
    "categorias": [
      {
        "nome": "Comédia",
      },
      {
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
}
