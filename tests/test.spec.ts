import { test } from '@playwright/test';
import { Methods } from './page-object/methods';


test('test case 1', async ({ page }) => {
  const methods = new Methods(page);
  await page.goto("https://app.astrato.io/");
  await methods.login("Jakub.rumpca@gmail.com","Password123!");
  test.expect(await methods.getLoggedUserName()).toContain("jakub.rumpca@gmail.com")
});

test('test case 2', async ({ page }) => {
  const methods = new Methods(page);
  await page.goto('https://app.astrato.io/');
  await methods.login("Jakub.rumpca@gmail.com","Password123!");
  await methods.importOrDeleteData("Import");
  test.expect(await methods.checkIfDataIsAdded("Pie Sales")).toContain("Pie Sales");
  await methods.importOrDeleteData("Delete");
  test.expect(await methods.checkIfDataIsRemoved()).not.toContain("Pie Sales");
});