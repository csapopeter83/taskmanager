import path from 'node:path';
import { defineConfig, devices } from '@playwright/test';
import { config } from 'dotenv';
import type { TestOptions } from './tests/types';

config({ path: path.resolve(__dirname, '.env') });

const PORT = 4200;
const BASE_URL = `http://localhost:${PORT}`;

export default defineConfig<TestOptions>({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: 'html',
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
    language: 'en',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: [
    {
      command: 'pnpm exec ng serve --port 4200',
      cwd: '../web',
      url: BASE_URL,
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
    },
    {
      command: 'pnpm exec nest start',
      cwd: '../api',
      url: 'http://localhost:3000/health',
      reuseExistingServer: !process.env.CI,
      timeout: 60_000,
    },
  ],
});
