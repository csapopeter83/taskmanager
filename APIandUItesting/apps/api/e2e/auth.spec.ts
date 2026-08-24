import { loginRequest } from './services/auth-service';
import { LoginSuccessResponse } from './models/login-response';
import { expect, test } from './test-base';

test.describe('Auth API', () => {
  test('success login with correct credentials', async ({ request, user }) => {
    const response = await loginRequest(request, user);

    expect(response.status, `The response object is ${response}`).toBe(200);
    const successResponse = response as LoginSuccessResponse;
    expect(successResponse.accessToken.length).toBeGreaterThan(0);
  });

  test('login throws 401 with invalid password', async ({ request, user }) => {
    const response = await loginRequest(request, {
      username: user.username,
      password: 'wrong-password',
    });

    expect(response.status).toBe(401);
  });

  test('login throws 400 with missing username', async ({ request, user }) => {
    const response = await loginRequest(request, {
      password: user.password,
    });

    expect(response.status).toBe(400);
  });
});
