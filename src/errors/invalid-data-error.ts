import { ApplicationError } from '@/protocols';
import { UNAUTHORIZED } from 'http-status';

export function invalidDataError(details: string[]): ApplicationInvalidateDataError {
  return {
    code: UNAUTHORIZED,
    name: 'InvalidDataError',
    message: 'Invalid data',
    details,
  };
}

type ApplicationInvalidateDataError = ApplicationError & {
  details: string[];
};
