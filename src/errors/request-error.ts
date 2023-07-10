import { RequestError } from '@/protocols';
import { BAD_REQUEST } from 'http-status';

export function requestError(status: number, statusText: string): RequestError {
  return {
    name: 'RequestError',
    data: null,
    status,
    statusText,
    message: 'No result for this search!',
  };
}
