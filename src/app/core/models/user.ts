export interface User {
  id: string;
  nickname: string;
  email: string;
  first_name: string;
  second_name: string;
  first_surname: string;
  second_surname: string;
  age: number;
  type_document: string;
  document_number: string;
  cellphone: string;
  gender: string;
  nationality: string;
  country: string;
  department: string;
  city: string;
  real_ip: string;
  status_id: number;
  failed_attempts: number;
  block_date: string;
  disabled_date: string;
  last_login: string;
  last_change_password: string;
  birth_date: string;
  verified_code: string;
  is_deleted: boolean
  deleted_at: string;
  selfie_img: string;
  front_document_img: string;
  back_document_img: string;
  transaction_id: string;
  process_url: string;
  created_at: string;
  updated_at: string;
}

export interface CreateAccount {
  document_number: string;
  email: string;
  password: string;
  cellphone: string;
}

export interface ResponseOnboarding {
  url: string;
  method: string;
}
