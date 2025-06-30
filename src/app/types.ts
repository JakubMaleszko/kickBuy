import { StickyOffset } from "@angular/cdk/table";

export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: {
    rating: number;
    comment: string;
    date: string; // ISO date string
    reviewerName: string;
    reviewerEmail: string;
  }[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    barcode: string;
    qrCode: string;
  };
  thumbnail: string;
  images: string[];
};

export type ProductResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export type Cart = {
  id: number;
  products: Product[];
  total: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
};
export type CartResponse = {
  carts: Cart[];
  total: number;
  skip: number;
  limit: number;
}

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: 'male' | 'female' | string;
  email: string;
  phone: string;
  username: string;
  image: string;
  address: {
    address: string;
    city: string;
    state: string;
    stateCode: string;
    postalCode: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    country: string;
  };
  bank: {
    cardExpire: string;  // MM/YY format
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
  };
}

