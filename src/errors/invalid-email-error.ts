import { ApplicationError } from '@/protocols';
import { UNAUTHORIZED } from 'http-status';

export function invalidEmailError(email: string): ApplicationEmailError {
  return {
    code: UNAUTHORIZED,
    name: 'InvalidEmailError',
    email: email,
    message: `"${email}" is not a valid email!`,
  };
}

export type ApplicationEmailError = ApplicationError & { email: string };
