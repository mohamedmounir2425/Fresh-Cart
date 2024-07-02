import { CurrencyPipe } from '@angular/common';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { AddRemoveCartComponent } from '../add-remove-cart/add-remove-cart.component';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CurrencyPipe, CarouselModule, AddRemoveCartComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  id!: string;
  product: any;
  cartCount: number = 0;
  isLoading: boolean = false;
  FetchingProduct: boolean = false;
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
    private _ProductsService: ProductsService,
    private toastr: ToastrService,
    private _CartService: CartService
  ) {}

  ngOnInit(): void {
    this.FetchingProduct = true;
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
        this.FetchingProduct = false;
      },
      error: (err) => {
        console.error(err);
        this.FetchingProduct = false;
      },
    });
    this._CartService.getCart().subscribe({
      next: ({ data }) => {
        console.log(data);
        this.cartCount =
          data.products.find((p: any) => p.product.id == this.product.id)
            ?.count || 0;
        // this.product = data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  addToCart(productId: string) {
    this.isLoading = true;
    this._CartService.addToCart(productId).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'success') {
          this.cartCount = res.data.products.find(
            (p: any) => p.product === this.product._id
          ).count;
        }
        this.isLoading = false;
        this.toastr.success(res.message, undefined, {
          timeOut: 3000,
        });
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }
}
