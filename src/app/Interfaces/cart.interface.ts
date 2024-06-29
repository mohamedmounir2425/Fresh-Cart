export interface RootObject {
  data: Data;
  numOfCartItems: number;
  status: string;
}

export interface Data {
  __v: number;
  _id: string;
  cartOwner: string;
  createdAt: Date;
  products: ProductElement[];
  totalCartPrice: number;
  updatedAt: Date;
}

export interface ProductElement {
  _id: string;
  count: number;
  price: number;
  product: ProductProduct;
}

export interface ProductProduct {
  _id: string;
  brand: Brand;
  category: Brand;
  id: string;
  imageCover: string;
  quantity: number;
  ratingsAverage: number;
  subcategory: Brand[];
  title: string;
}

export interface Brand {
  _id: ID;
  category?: ID;
  image?: string;
  name: Name;
  slug: Slug;
}

export enum ID {
  The6407F1Bcb575D3B90Bf95797 = '6407f1bcb575d3b90bf95797',
  The64089Bbe24B25627A253158B = '64089bbe24b25627a253158b',
  The6439D58A0049Ad0B52B9003F = '6439d58a0049ad0b52b9003f',
}

export enum Name {
  DeFacto = 'DeFacto',
  WomenSClothing = "Women's Clothing",
  WomenSFashion = "Women's Fashion",
}

export enum Slug {
  Defacto = 'defacto',
  WomenSClothing = "women's-clothing",
  WomenSFashion = "women's-fashion",
}
