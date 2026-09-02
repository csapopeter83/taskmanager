import { LogAction } from '../annotations/log-action';
import { User } from '../tests/types';
import { BasePage } from './base_page';

const LOGIN_POPUP_TEST_IDS = {
  title: 'login-title',
  usernameLabel: 'username-label',
  usernameInput: 'username-input',
  passwordLabel: 'password-label',
  passwordInput: 'password-input',
  loginButton: 'login-submit',
  forgotPasswordButton: 'forgot-password-button',
  registerButton: 'register-button',
  loginError: 'login-error',
};

export class LoginPopup extends BasePage {
  title = this.page.getByTestId(LOGIN_POPUP_TEST_IDS.title);
  usernameLabel = this.page.getByTestId(LOGIN_POPUP_TEST_IDS.usernameLabel);
  usernameInput = this.page.getByTestId(LOGIN_POPUP_TEST_IDS.usernameInput);
  passwordLabel = this.page.getByTestId(LOGIN_POPUP_TEST_IDS.passwordLabel);
  passwordInput = this.page.getByTestId(LOGIN_POPUP_TEST_IDS.passwordInput);
  loginButton = this.page.getByTestId(LOGIN_POPUP_TEST_IDS.loginButton);
  forgotPasswordButton = this.page.getByTestId(LOGIN_POPUP_TEST_IDS.forgotPasswordButton);
  registerButton = this.page.getByTestId(LOGIN_POPUP_TEST_IDS.registerButton);
  loginError = this.page.getByTestId(LOGIN_POPUP_TEST_IDS.loginError);

  @LogAction
  async login(user: User): Promise<void> {
    await this.usernameInput.fill(user?.name);
    await this.passwordInput.fill(user?.password);
    await this.loginButton.click();
  }
}
