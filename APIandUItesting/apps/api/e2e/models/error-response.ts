import { ResponseBase } from './response-base';

export interface ErrorResponse extends ResponseBase {
  message: string | string[];
  error: string;
}
