import { CurrencyPipe } from '@angular/common';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CurrencyPipe, CarouselModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  id!: string;
  product: any;
  productOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 300,
    navText: ['', ''],
    autoplay: true,
    autoplayTimeout: 3000,
    items: 1,
    nav: true,
  };
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
