import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tile',
  imports: [RouterLink],
  templateUrl: './tile.html',
  styleUrl: './tile.scss'
})
export class Tile {
  title = input.required();
  price = input.required();
  img = input.required();
  link = input<string | readonly any[] | null | undefined>();
// {{ Info }}
  rating = input()
  category = input();
  brand = input();
  stock = input();
}
