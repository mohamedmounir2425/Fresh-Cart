import { CurrencyPipe } from '@angular/common';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  id!: string;
  product: any;
  constructor(
    private route: ActivatedRoute,
    private _ProductsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (route) => {
        console.log({ route });
        this.id = route['id'];
      },
    });
    this._ProductsService.getProductById(this.id).subscribe({
      next: ({ data }) => {
        console.log(data);
        this.product = data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
