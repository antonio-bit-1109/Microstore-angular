export interface ICreateCart {
  idUser: number | undefined;
  listaProdotti: IListaProd[] | undefined;
}

export interface IListaProd {
  idProd: number;
  quantity: number;
  prezzoUnitario: number;
  nomeProdotto: string;
  img: string;
}
