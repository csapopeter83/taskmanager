import type { Page } from '@playwright/test';
import { test as base } from '@playwright/test';
import type { BasePage } from '../pages/base_page';
import { DashboardPage } from '../pages/dashboard_page';
import { HeaderPage } from '../pages/header_page';
import { LoginPopup } from '../pages/login_popup';
import { MainPage } from '../pages/main_page';
import { TranslationService } from '../services/translation_service';
import type { PageObjects, Services, TestOptions } from './types';

function createPage<T extends BasePage>(PageObject: new (page: Page) => T) {
  return async ({ page }: { page: Page }, use: (pageObject: T) => Promise<void>) => {
    await use(new PageObject(page));
  };
}

function pageFixtures() {
  return {
    mainPage: createPage(MainPage),
    headerPage: createPage(HeaderPage),
    loginPopup: createPage(LoginPopup),
    dashboard: createPage(DashboardPage),
  };
}

function serviceFixture() {
  return {
    translationService: async (
      { language }: { language: string },
      use: (service: TranslationService) => Promise<void>
    ) => {
      await use(new TranslationService(language));
    },
  };
}

export const test = base.extend<TestOptions & PageObjects & Services>({
  ...pageFixtures(),
  user: { name: process.env.E2E_USERNAME ?? '', password: process.env.E2E_PASSWORD ?? '' },
  language: ['en', { option: true }],
  apiKey: [process.env.API_KEY || '', { option: true }],
  ...serviceFixture(),
});

export { expect } from '@playwright/test';
