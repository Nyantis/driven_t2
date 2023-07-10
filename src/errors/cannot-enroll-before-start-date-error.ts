import { ApplicationError } from '@/protocols';
import { BAD_REQUEST } from 'http-status';

export function cannotEnrollBeforeStartDateError(): ApplicationError {
  return {
    code: BAD_REQUEST,
    name: 'CannotEnrollBeforeStartDateError',
    message: 'Cannot enroll before event start date!',
  };
}
