export interface IProduct {
  id: number;
  name: string;
  description: string;
  prezzo: string;
  category: string;
  stock: string;
  is_active: string;
  image_url: string;
}

export interface IProductResponse {
  msg: string;
  listaProdotti: IProduct[];
}

export interface ISingleProduct {
  msg: string;
  prodDTO: IProduct;
}
