interface IAppResponse {
  statusCode?: number;
  result: string;
  code: number;
  message?: string;
  data?: any;
  method?: number;
}
export class AppResponse {
  public readonly statusCode: number;
  public readonly result: string;
  public readonly code: number;
  public readonly message: string | undefined;
  public readonly method: number | undefined;
  public readonly data: any;

  constructor({
    statusCode = 200,
    result,
    code,
    message,
    method,
    data,
  }: IAppResponse) {
    this.statusCode = statusCode;
    this.result = result;
    this.code = code;
    this.message = message;
    this.method = method;
    this.data = data;
  }
}
