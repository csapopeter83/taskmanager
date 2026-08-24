import type { Page, Response } from '@playwright/test';

export class BasePage {
  constructor(readonly page: Page) {}

  async open(): Promise<Response | null> {
    return await this.page.goto(`/${this.pageUrl() ?? ''}`);
  }

  public pageUrl(): string {
    console.log('Base page pageUrl function');
    return '';
  }

  public currentUrl(): string {
    return this.page.url();
  }
}
