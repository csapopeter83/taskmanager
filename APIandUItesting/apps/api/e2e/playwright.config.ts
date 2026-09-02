import path from 'node:path';
import { defineConfig } from '@playwright/test';
import { config } from 'dotenv';
import type { TestOptions } from './types';

config({ path: path.resolve(__dirname, '.env') });

const PORT = 3001;

const BASE_URL = process.env.API_BASE_URL ?? `http://localhost:${PORT}`;

export default defineConfig<TestOptions>({
  testDir: '.',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],
  outputDir: 'test-results',
  use: {
    baseURL: BASE_URL,
  },
  webServer: process.env.API_BASE_URL
    ? undefined
    : {
        command: 'pnpm exec nest start',
        cwd: '..',
        url: `${BASE_URL}/health`,
        reuseExistingServer: !process.env.CI,
        timeout: 60_000,
        env: { PORT: String(PORT) },
      },
});
