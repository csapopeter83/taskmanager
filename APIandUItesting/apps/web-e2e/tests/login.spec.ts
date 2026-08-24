import { expect, test } from './test_base';

const VALID_USERNAME = process.env.E2E_USERNAME;
const VALID_PASSWORD = process.env.E2E_PASSWORD;

if (!VALID_USERNAME || !VALID_PASSWORD) {
  throw new Error(
    'E2E_USERNAME and E2E_PASSWORD must be set. Copy apps/web-e2e/.env.example to apps/web-e2e/.env.'
  );
}

test.describe('Login flow', () => {
  test.beforeEach(async ({ mainPage }) => {
    await mainPage.open();
  });

  test('successful login with valid credentials', async ({
    headerPage,
    loginPopup,
    dashboard,
    user,
  }) => {
    await headerPage.openLogin();
    await loginPopup.login(user);
    await expect(dashboard.title).toBeVisible();
  });

  test('verify login popup elements visibility', async ({ headerPage, loginPopup }) => {
    await headerPage.openLogin();

    await expect.soft(loginPopup.usernameLabel).toBeVisible();
    await expect.soft(loginPopup.usernameInput).toBeVisible();
    await expect.soft(loginPopup.passwordLabel).toBeVisible();
    await expect.soft(loginPopup.passwordInput).toBeVisible();
    await expect.soft(loginPopup.loginButton).toBeVisible();
    await expect.soft(loginPopup.forgotPasswordButton).toBeVisible();
    await expect.soft(loginPopup.registerButton).toBeVisible();
  });

  test('shows an error message for invalid credentials', async ({
    headerPage,
    loginPopup,
    user,
  }) => {
    await headerPage.openLogin();
    await loginPopup.login({ name: user.name, password: 'asdf' });
    await expect(loginPopup.loginError).toBeVisible();
  });

  test('after logout can not reach dashboard page', async ({
    headerPage,
    loginPopup,
    dashboard,
    user,
  }) => {
    await headerPage.openLogin();
    await loginPopup.login(user);
    await headerPage.logout();

    await dashboard.open();
    expect(dashboard.currentUrl()).not.toContain(dashboard.pageUrl());
  });

  test('verify login popup translations', async ({
    headerPage,
    loginPopup,
    translationService,
    language,
  }) => {
    await headerPage.openLogin();
    await expect
      .soft(loginPopup.title)
      .toHaveText(translationService.getTranslation('Auth.Login.Title', language));
    await expect
      .soft(loginPopup.usernameLabel)
      .toHaveText(translationService.getTranslation('Auth.Login.Username', language));
    await expect
      .soft(loginPopup.passwordLabel)
      .toHaveText(translationService.getTranslation('Auth.Login.Password', language));
    await expect
      .soft(loginPopup.loginButton)
      .toHaveText(translationService.getTranslation('Auth.Login.LoginButton', language));
    await expect
      .soft(loginPopup.forgotPasswordButton)
      .toHaveText(translationService.getTranslation('Auth.Login.ForgotPassword', language));
    await expect
      .soft(loginPopup.registerButton)
      .toHaveText(translationService.getTranslation('Auth.Login.Register', language));
  });
});
