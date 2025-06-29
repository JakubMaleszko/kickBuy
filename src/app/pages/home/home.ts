import { Component, inject, OnInit } from '@angular/core';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { Tile } from "../../components/tile/tile";
import { ProductStore } from '../../store/productStore';
import { MatProgressBar, MatProgressBarModule } from '@angular/material/progress-bar';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-home',
  imports: [MatToolbarModule, Tile, MatProgressBarModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  readonly store = inject(ProductStore);
  ngOnInit(): void {
    this.store.getProducts();
  }
}
