interface IAppError {
  statusCode?: number;
  result: string;
  code?: number;
  message?: string;
  data?: any;
  transactionId?: string;
  method?: number;
}
export class AppError {
  public readonly statusCode: number;
  public readonly result: string;
  public readonly code: number | undefined;
  public readonly message: string | undefined;
  public readonly transactionId: string | undefined;
  public readonly method: number | undefined;
  public readonly data: any;

  constructor({
    statusCode = 400,
    result,
    code,
    message,
    transactionId,
    method,
    data,
  }: IAppError) {
    this.statusCode = statusCode;
    this.result = result;
    this.code = code;
    this.message = message;
    this.transactionId = transactionId;
    this.method = method;
    this.data = data;
  }
}
