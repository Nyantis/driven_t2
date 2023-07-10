import { ApplicationError } from '@/protocols';
import { NOT_FOUND } from 'http-status';

export function notFoundError(): ApplicationError {
  return {
    code: NOT_FOUND,
    name: 'NotFoundError',
    message: 'No result!',
  };
}
