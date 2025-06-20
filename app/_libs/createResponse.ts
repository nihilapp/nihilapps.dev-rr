import type { ApiResponse } from '@/_entities/common';

interface CreateResponseProps<T> {
  data: T;
  status: number;
  message: string;
}

export function createResponse<T>({ data, status, message, }: CreateResponseProps<T>) {
  return {
    data,
    status,
    message,
  } as ApiResponse<T>;
};
