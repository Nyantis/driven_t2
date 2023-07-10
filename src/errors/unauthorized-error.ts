import { ApplicationError } from '@/protocols';
import { UNAUTHORIZED } from 'http-status';

export function unauthorizedError(): ApplicationError {
  return {
    code: UNAUTHORIZED,
    name: 'UnauthorizedError',
    message: 'You must be signed in to continue',
  };
}
