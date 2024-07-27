export class ApplicationError extends Error {
  constructor(message = "Not found", options?: ErrorOptions) {
    super(message, options);

    this.name = "ApplicationError";
  }
}

export class ValidationError extends Error {
  public fieldErrors: Record<string, string[] | undefined>;

  constructor(fieldErrors: Record<string, string[] | undefined>, message?: string, options?: ErrorOptions) {
    super("Validation failed!", options);

    this.fieldErrors = fieldErrors;
    this.name = "ValidationError";
  }
}

export class RateLimitError extends Error {
  constructor() {
    super("Rate limit exceeded");
    this.name = "RateLimitError";
  }
}

export class AuthenticationError extends ApplicationError {
  constructor() {
    super("You must be logged in to view this content");
    this.name = "AuthenticationError";
  }
}

export class NotFoundError extends ApplicationError {
  constructor() {
    super("Resource not found");
    this.name = "NotFoundError";
  }
}

export class TokenExpiredError extends ApplicationError {
  constructor() {
    super("Token has expired");
    this.name = "TokenExpiredError";
  }
}

export class LoginError extends ApplicationError {
  constructor() {
    super("Invalid email or password");
    this.name = "LoginError";
  }
}
