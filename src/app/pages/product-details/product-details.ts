import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductStore } from '../../store/product-store';
import { Slider } from "../../components/slider/slider";
import { MatProgressBar } from '@angular/material/progress-bar';
import {  MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatToolbar } from '@angular/material/toolbar';
import { Toolbar } from "../../components/toolbar/toolbar";

@Component({
  selector: 'app-product-details',
  imports: [Slider, MatProgressBar, MatButtonModule, MatIconModule, MatTableModule, Toolbar],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss'
})
export class ProductDetails implements OnInit {
  readonly route = inject(ActivatedRoute);
  readonly store = inject(ProductStore);
  id!: number;

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam ? +idParam : 0;

    if (this.id) {
      this.store.getProductById(this.id);
    } else {
      console.error('Invalid ID in route.');
    }
  }

  // {{ Table setup}}
   displayedColumns = [
    'key',
    'value',
  ];

  // Flatten product properties for table display
  get productData() {
    const product = this.store.product();
    if (!product) return [];

    return [
      { key: 'Category', value: product.category },
      { key: 'Rating', value: product.rating },
      { key: 'Stock', value: product.stock },
      { key: 'Tags', value: product.tags.join(', ') },
      { key: 'Brand', value: product.brand },
      { key: 'SKU', value: product.sku },
      { key: 'Weight', value: product.weight },
      { key: 'Dimensions', value: `${product.dimensions.width} x ${product.dimensions.height} x ${product.dimensions.depth}` },
      { key: 'Warranty Info', value: product.warrantyInformation },
      { key: 'Shipping Info', value: product.shippingInformation },
      { key: 'Availability', value: product.availabilityStatus },
      { key: 'Return Policy', value: product.returnPolicy },
      { key: 'Minimum Order Quantity', value: product.minimumOrderQuantity },
      { key: 'Created At', value: new Date(product.meta.createdAt).toLocaleString() },
      { key: 'Updated At', value: new Date(product.meta.updatedAt).toLocaleString() },
    ];
  }
}
