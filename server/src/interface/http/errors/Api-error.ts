export class ApiError extends Error {
  public readonly code: number;
  public readonly error_code: string;
  public readonly error_description: string;

  constructor(error_description: string, code: number, error_code: string) {
    super(error_description);
    this.code = code;
    this.name = this.constructor.name;
    this.error_code = error_code.toUpperCase();
    this.error_description = error_description;
  }
}

export class ServerError extends ApiError {
  constructor(error_description: string) {
    super(error_description, 500, "SERVER_ERROR");
  }
}

export class NotFoundError extends ApiError {
  constructor(error_description: string, error_code: string) {
    super(error_description, 404, error_code);
  }
}
export class NotAcceptableError extends ApiError {
  constructor(error_description: string, error_code: string) {
    super(error_description, 406, error_code);
  }
}

export class BadRequestError extends ApiError {
  constructor(error_description: string, error_code: string) {
    super(error_description, 400, error_code);
  }
}
