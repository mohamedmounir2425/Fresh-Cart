import { CurrencyPipe } from '@angular/common';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { CuttextPipe } from '../../pipes/cuttext.pipe';
import { RouterModule } from '@angular/router';
import { Category } from '../../Interfaces/category';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CurrencyPipe, CuttextPipe, RouterModule, CarouselModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  products!: any[];
  categories!: Category[];
  mainSliderOptions: OwlOptions = {
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
  categoryOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 300,
    navText: ['', ''],
    autoplay: true,
    autoplayTimeout: 3000,

    slideBy: 3,

    responsive: {
      0: {
        items: 1,
      },
      300: {
        items: 2,
      },
      500: {
        items: 3,
      },
      740: {
        items: 4,
      },
      940: {
        items: 6,
      },
    },
    nav: true,
  };

  constructor(private _ProductsService: ProductsService) {}
  ngOnInit(): void {
    this._ProductsService.getProducts().subscribe({
      next: (res) => {
        this.products = res.data;
      },
      error: (err) => {
        console.error(err);
      },
    });
    this._ProductsService.getCategories().subscribe({
      next: (res) => {
        console.log('cat', res);
        this.categories = res.data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
