import { Categoria } from "./categoria";

export class Filme {
  constructor(
    public titulo: string,
    public diretor: string,
    public ano: number,
    public categorias: Categoria[],
    public atores: string[],
    public imagem: string,
  ) {

  }
}
