export function throwMissingRequiredAttributes<T = any>(object: T, attributes: (keyof T)[]) {
  if (object == null) {
    throw Error(`Missing required attributes: ${attributes}`);
  }

  const missing: (keyof T)[] = [];

  for (const attribute of attributes) {
    if (object[attribute] == null) {
      missing.push(attribute);
    }
  }

  if (missing.length > 0) {
    throw new AppError(400, `Missing required attributes: ${attributes}`);
  }
}

export class AppError extends Error {
  statusCode: number;

  constructor(statusCode: number, reason: string | Error) {
    if (typeof reason === 'string') {
      super(reason);
    } else {
      super(reason.message);
    }

    this.statusCode = statusCode;
  }
}
