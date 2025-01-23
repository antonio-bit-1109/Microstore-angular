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
