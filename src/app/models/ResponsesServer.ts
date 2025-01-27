export interface RESP_REGISTER_POSITIVE {
  user: {
    name: string;
    email: string;
    phone: string;
    isActive: string;
  };
  message: string;
}

export interface ERR_REGISTRATION {
  message: string;
  [key: string]: string | null;
}

export interface TOKEN_STORAGE {
  token: string;
}

export interface TOKEN_PAYLOAD {
  sub: string;
  role: string;
  jti: string;
  iat: number;
  exp: number;
}

export interface ERR_LOGIN {
  [key: string]: string;
}

export interface GENERAL_ERR {
  [key: string]: string;
}

export interface SUCCESS_ADD_STOCK {
  prodDTO: {
    id: Number;
    name: string;
    description: string;
    prezzo: string;
    category: string;
    stock: string;
    is_active: string;
    image_url: string;
  };
  msg: string;
}

export interface GENERAL_SUCCESS_MESSAGE {
  message: string;
}
