export interface ResAnny<T = any> {
  error: boolean;
  data: T;
  msg: string;
  code: number;
  type: string;
}
