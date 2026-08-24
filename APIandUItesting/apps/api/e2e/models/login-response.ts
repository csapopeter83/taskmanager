import { ResponseBase } from './response-base';

export interface LoginSuccessResponse extends ResponseBase {
  accessToken: string;
}
