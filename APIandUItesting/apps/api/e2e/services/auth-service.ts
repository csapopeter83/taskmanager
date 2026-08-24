import { APIRequestContext } from '@playwright/test';
import { ErrorResponse } from '../models/error-response';
import { LoginSuccessResponse } from '../models/login-response';
import { Authentication } from '../models/authentication';

export const loginRequest = async (
  request: APIRequestContext,
  authentication: Authentication
): Promise<LoginSuccessResponse | ErrorResponse> => {
  const response = await request.post('/auth/login', {
    data: authentication,
  });

  const responseObj = await response.json();
  return { ...responseObj, status: response.status() };
};
