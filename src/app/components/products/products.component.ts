import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ProductComponent } from '../product/product.component';
import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';
import { WishListService } from '../../services/wish-list.service';
import { Category } from '../../Interfaces/category';
import { LoadingProductsComponent } from './loading-products/loading-products.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductComponent, LoadingProductsComponent, NgxPaginationModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ProductsComponent implements OnInit, OnDestroy {
  supscribeId!: Subscription;
  products!: any[];
  wishListData: string[] = [];
  cart!: any[];
  isLoading: boolean = false;
  // pagination
  totalItems: number = 0;
  itemsPerPage: number = 0;
  currentPage: number = 1;
  constructor(
    private _ProductsService: ProductsService,
    private _CartService: CartService,
    private _WishListService: WishListService
  ) {}
  ngOnInit(): void {
    this.fetchProducts();
    this._CartService.getCart().subscribe({
      next: (res) => {
        this.cart = res.data.products;
      },
      error: (err) => {
        console.error(err);
      },
    });
    this._CartService.getCartSubject().subscribe({
      next: (res) => {
        this.cart = res;
      },
      error: (err) => {
        console.error(err);
      },
    });
    this._WishListService.getUserWishList().subscribe({
      next: (res) => {
        console.log(res);
        this.wishListData = res.data.map((item: any) => item._id);
      },
      error: (err) => console.log(err),
    });
  }
  fetchProducts(pageNum?: number) {
    this.isLoading = true;
    this.supscribeId = this._ProductsService.getProducts(pageNum).subscribe({
      next: (res) => {
        console.log(res);

        this.products = res.data;
        this.totalItems = res.results;
        this.itemsPerPage = res.metadata.limit;
        this.currentPage = res.metadata.currentPage;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      },
    });
  }
  pageChanged(event: any) {
    this.fetchProducts(event);
  }
  ngOnDestroy(): void {
    this.supscribeId.unsubscribe();
  }
}
