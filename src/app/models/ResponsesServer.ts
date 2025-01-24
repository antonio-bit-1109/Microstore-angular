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
