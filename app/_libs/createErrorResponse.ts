import type { ApiError } from '@/_entities/common';

interface CreateErrorResponseProps {
  status: number;
  message: string;
}

export function createErrorResponse({ status, message, }: CreateErrorResponseProps) {
  return {
    data: null,
    status,
    message,
  } as ApiError;
}
