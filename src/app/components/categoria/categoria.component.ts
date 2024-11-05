import { Component, Input } from '@angular/core';
import { Categoria } from '../../models/categoria';

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css'
})
export class CategoriaComponent {

  @Input({
    required: true,
  })
  public categoria!: Categoria;

}
