import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingProductsComponent } from '../../products/loading-products/loading-products.component';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../../pipes/search.pipe';
import { ProductComponent } from '../../product/product.component';
import { ProductsService } from '../../../services/products.service';
import { CartService } from '../../../services/cart.service';
import { WishListService } from '../../../services/wish-list.service';
import { ProductsComponent } from '../../products/products.component';

@Component({
  selector: 'app-category-products',
  standalone: true,
  imports: [
    // ProductComponent,
    // LoadingProductsComponent,
    // SearchPipe,
    // FormsModule,
    ProductsComponent,
  ],
  templateUrl: './category-products.component.html',
  styleUrl: './category-products.component.scss',
})
export class CategoryProductsComponent implements OnInit {
  supscribeId!: Subscription;
  categoryId!: string;
  // products!: any[];
  // wishListData: string[] = [];
  // cart!: any[];
  // isLoading: boolean = false;
  // searchTerm: string = '';
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
