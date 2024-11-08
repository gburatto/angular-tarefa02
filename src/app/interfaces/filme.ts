import { ICategoria } from "./categoria";

export interface IFilme {
  _id: number;
  titulo: string;
  diretor: string;
  ano: number;
  categorias: ICategoria[];
  atores: string[];
  imagem: string;
}
