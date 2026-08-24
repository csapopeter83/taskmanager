import { expect } from '../tests/test_base';
import { BasePage } from './base_page';

const HEADER_PAGE_TEST_IDS = {
  loginButton: 'open-login-button',
  logoutButton: 'logout-button',
};

export class HeaderPage extends BasePage {
  loginButton = this.page.getByTestId(HEADER_PAGE_TEST_IDS.loginButton);
  logoutButton = this.page.getByTestId(HEADER_PAGE_TEST_IDS.logoutButton);

  openLogin(): Promise<void> {
    return this.loginButton.click();
  }

  async logout(): Promise<void> {
    await expect(this.logoutButton).toBeVisible();

    await this.logoutButton.click();
  }
}
