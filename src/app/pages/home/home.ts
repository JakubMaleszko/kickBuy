import { Component, inject, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Tile } from "../../components/tile/tile";
import { ProductStore } from '../../store/product-store';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Toolbar } from "../../components/toolbar/toolbar";
@Component({
  selector: 'app-home',
  imports: [MatToolbarModule, Tile, MatProgressBarModule, MatFormFieldModule,
    MatPaginatorModule, MatInputModule, MatButtonModule, MatIconModule,
    ReactiveFormsModule, Toolbar],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  readonly store = inject(ProductStore);
  readonly router = inject(Router)
  readonly route = inject(ActivatedRoute);
  searchForm = new FormGroup({
    searchControl: new FormControl('')
  });

  ngOnInit(): void {
    const searchQuery = this.route.snapshot.queryParamMap.get('search') || '';
    this.searchForm.get('searchControl')?.setValue(searchQuery);
    this.store.setQuery(searchQuery);
    this.store.getProducts();
  }
  searchControl = new FormControl('');

  onPageChange(event: PageEvent) {
    this.store.setPageSize(event.pageSize);
    this.store.setCurrentPage(event.pageIndex + 1);
    this.store.getProducts();
  }

  onSearchSubmit(): void {
    const query = this.searchForm.get('searchControl')?.value || '';
    this.router.navigate([], {
      queryParams: { search: query },
      queryParamsHandling: 'merge'
    });
    this.store.setQuery(query);
    this.store.getProducts();
  }
}
