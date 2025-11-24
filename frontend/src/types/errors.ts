export enum ErrorType {
  NETWORK_ERROR = 'NETWORK_ERROR',
  API_ERROR = 'API_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

export interface AppError {
  type: ErrorType;
  message: string;
  details?: unknown;
  timestamp: number;
}

export const createError = (
  type: ErrorType,
  message: string,
  details?: unknown
): AppError => ({
  type,
  message,
  details,
  timestamp: Date.now(),
});

export const isNetworkError = (error: unknown): boolean => {
  if (error && typeof error === 'object' && 'code' in error) {
    const code = (error as { code: string }).code;
    return (
      code === 'ERR_NETWORK' ||
      code === 'ECONNREFUSED' ||
      code === 'ENOTFOUND'
    );
  }
  return false;
};

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'Erro desconhecido';
};
