import { ApplicationError } from '@/protocols';
import { CONFLICT } from 'http-status';

export function conflictError(message: string): ApplicationError {
  return {
    code: CONFLICT,
    name: 'ConflictError',
    message,
  };
}
