import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { LoadingProductsComponent } from '../products/loading-products/loading-products.component';
import { CategoryComponent } from './category/category.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [LoadingProductsComponent, CategoryComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class CategoriesComponent implements OnInit, OnDestroy {
  subsciptionId!: Subscription;
  categories: any[] = [];
  isLoading: boolean = false;
  constructor(private _ProductsService: ProductsService) {}
  ngOnInit(): void {
    this.fetchCategory();
  }
  fetchCategory() {
    this.isLoading = true;
    this.subsciptionId = this._ProductsService.getCategories().subscribe({
      next: (res) => {
        console.log(res);
        this.categories = res.data;
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }
  ngOnDestroy(): void {
    this.subsciptionId.unsubscribe();
  }
}
