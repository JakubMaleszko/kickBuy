import { Component, input } from '@angular/core';

@Component({
  selector: 'app-tile',
  imports: [],
  templateUrl: './tile.html',
  styleUrl: './tile.scss'
})
export class Tile {
  title = input.required();
  price = input.required();
  img = input.required();
  link = input();
// {{ Info }}
  rating = input()
  category = input();
  brand = input();
  stock = input();
}
