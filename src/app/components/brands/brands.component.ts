import { Component, OnInit } from '@angular/core';
import { BrandComponent } from './brand/brand.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [BrandComponent],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent implements OnInit {
  brands: any[] = [];
  isLoading: boolean = false;
  constructor(private _HttpClient: HttpClient) {}
  ngOnInit(): void {
    this.isLoading = true;
    this._HttpClient.get(`${environment.apiURL}/api/v1/brands`).subscribe({
      next: (res: any) => {
        console.log(res);
        this.brands = res.data;
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }
}
