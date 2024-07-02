import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsComponent } from '../../products/products.component';

@Component({
  selector: 'app-brand-products',
  standalone: true,
  imports: [ProductsComponent],
  templateUrl: './brand-products.component.html',
  styleUrl: './brand-products.component.scss',
})
export class BrandProductsComponent implements OnInit {
  brandId!: string;
  constructor(private _ActivatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe({
      next: (res) => {
        console.log(res);
        this.brandId = res['id'];
      },
      error: (err) => console.log(err),
    });
  }
}
