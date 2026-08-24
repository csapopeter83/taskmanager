import { test as base } from '@playwright/test';
import type { TestOptions } from './types';

// biome-ignore lint/complexity/noBannedTypes: Playwright's Fixtures<T, W> generics default to {} to mean "no new test-scoped fixtures"
export const test = base.extend<{}, TestOptions>({
  user: [
    { username: process.env.E2E_USERNAME ?? '', password: process.env.E2E_PASSWORD ?? '' },
    { scope: 'worker' },
  ],
});

export { expect } from '@playwright/test';
