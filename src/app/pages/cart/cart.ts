import { Component, inject, OnInit } from '@angular/core';
import { CartStore } from '../../store/cart-store';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CartTile } from "../../components/cart-tile/cart-tile";
import { MatButtonModule } from '@angular/material/button';;

@Component({
  selector: 'app-cart',
  imports: [MatIconModule, MatProgressBarModule, CartTile, MatButtonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss'
})
export class Cart implements OnInit{
  readonly store = inject(CartStore);
  ngOnInit(): void {
    this.store.getCart();
  }
  ti(){
    console.log(this.store.cart())
  }
}
