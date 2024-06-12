export interface Responce<T>{
  success: boolean;
  message: string;
  data: T;
}
