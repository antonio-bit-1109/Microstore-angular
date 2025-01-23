export interface IDataRegistrazioneUtente {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface IDataLogin {
  email: string;
  password: string;
}

export interface ILOGIN_SUCC {
  message: string;
  token: string;
}
