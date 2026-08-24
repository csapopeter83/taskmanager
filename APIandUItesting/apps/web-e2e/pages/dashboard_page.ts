import { BasePage } from './base_page';

const DASHBOARD_PAGE_TEST_IDS = {
  title: 'dashboard-heading',
};

export class DashboardPage extends BasePage {
  title = this.page.getByTestId(DASHBOARD_PAGE_TEST_IDS.title);

  public pageUrl(): string {
    console.log('Dashboard page pageUrl function');
    return 'dashboard';
  }
}
