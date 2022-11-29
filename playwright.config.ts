import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests',
  timeout: 60 * 1000,
  expect: {
    timeout: 5000
  },
  fullyParallel: true,
  workers: 2,
  reporter: 'html',
  use: {
    headless: false,
    trace: 'retain-on-failure',
  },
};

export default config;
