import { Component } from '@angular/core';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [ProductsComponent],
  templateUrl: './productsPage.component.html',
  styleUrl: './productsPage.component.scss',
})
export class ProductsPageComponent {}
