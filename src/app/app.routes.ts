import { Routes } from '@angular/router';
import { BrandsComponent } from './components/brands/brands.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

import { RegisterComponent } from './components/register/register.component';
import { authChildGuard } from './guards/auth-child.guard';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { ProductsPageComponent } from './components/productsPage/productsPage.component';

export const routes: Routes = [
  {
    path: '',
    component: BlankLayoutComponent,
    canActivateChild: [authChildGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'cart', component: CartComponent },
      { path: 'wishList', component: WishListComponent },
      {
        path: 'allorders',
        loadComponent: () =>
          import('./components/all-orders/all-orders.component').then(
            (m) => m.AllOrdersComponent
          ),
      },
      { path: 'payment', component: PaymentComponent },
      {
        path: 'updatePassword',
        loadComponent: () =>
          import(
            './components/settings/update-password/update-password.component'
          ).then((m) => m.UpdatePasswordComponent),
      },
      {
        path: 'products',
        component: ProductsPageComponent,
      },
      {
        path: 'product/:id',
        component: ProductDetailsComponent,
      },
      {
        path: 'categories',
        component: CategoriesComponent,
      },
      { path: 'brands', component: BrandsComponent },
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
  { path: '**', component: NotfoundComponent },
];
