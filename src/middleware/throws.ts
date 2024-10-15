import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from './api-errors';

const ERRORS = {
  Unauthorized: UnauthorizedError,
  Unexist: NotFoundError,
  Wrong: BadRequestError,
};

export default ERRORS;
