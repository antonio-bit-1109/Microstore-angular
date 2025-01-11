import { IProduct } from '../models/product.model';

export const PRODOTTI: IProduct[] = [
  {
    id: 1,
    name: 'prodottogenerico',
    description: 'ciao sono un prodotto',
    prezzo: '12.34',
    category: 'general',
    stock: '56',
    is_active: 'false',
    image_url:
      'https://www.europeanaffairs.it/wp-content/uploads/2020/01/farmaco-generico-vs-farmaco-di-marca.jpg',
  },
  {
    id: 2,
    name: 'ghghgh',
    description: 'prodotto puzzolente',
    prezzo: '14.54',
    category: 'general',
    stock: '91',
    is_active: 'true',
    image_url:
      'https://images.dissapore.com/wp-content/uploads/2014/06/Puzza-di-cibo.jpg?width=1280&height=720&quality=50',
  },
  {
    id: 3,
    name: 'orologio',
    description: 'prodotto puzzolente',
    prezzo: '24.5',
    category: 'general',
    stock: '44',
    is_active: 'true',
    image_url:
      'https://curren.it/cdn/shop/files/5_adb42755-c70b-41c9-acc3-b9df0a6ee24b.jpg?v=1724527774&width=900',
  },
  {
    id: 4,
    name: 'canarino',
    description: 'prodotto bellissimo piu nuovo',
    prezzo: '14.54',
    category: 'general',
    stock: '1',
    is_active: 'true',
    image_url:
      'https://a.storyblok.com/f/193084/841x458/50f98fd4b7/canarino.jpg/m/1536x836/filters:quality(90)',
  },
  {
    id: 5,
    name: 'cactus',
    description: 'prodotto pizzicoso',
    prezzo: '14.54',
    category: 'general',
    stock: '1',
    is_active: 'true',
    image_url:
      'https://www.florarici.it/img/cms/Blog/ddbc02_17eb5319af7441ddbedcb89ba2f46b2d_mv2.jpg',
  },
  {
    id: 6,
    name: 'ciaociao',
    description: 'prodotto puzzolente',
    prezzo: '14.54',
    category: 'general',
    stock: '88',
    is_active: 'true',
    image_url:
      'https://st2.depositphotos.com/5269571/8779/v/450/depositphotos_87793818-stock-illustration-hello-vector-lettering.jpg',
  },
];
