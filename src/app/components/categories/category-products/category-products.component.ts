import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsComponent } from '../../products/products.component';

@Component({
  selector: 'app-category-products',
  standalone: true,
  imports: [ProductsComponent],
  templateUrl: './category-products.component.html',
  styleUrl: './category-products.component.scss',
})
export class CategoryProductsComponent implements OnInit {
  categoryId!: string;
  constructor(private _ActivatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe({
      next: (res) => {
        console.log(res);
        this.categoryId = res['id'];
      },
      error: (err) => console.log(err),
    });
  }
}
