import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-tile',
  imports: [RouterLink],
  templateUrl: './cart-tile.html',
  styleUrl: './cart-tile.scss'
})
export class CartTile {
  title = input.required();
  price = input.required();
  img = input.required();
  link = input<string | readonly any[] | null | undefined>();
}
