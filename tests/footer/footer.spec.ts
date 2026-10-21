import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
})

test('Тест на навигацию в магазин', async ({ page }) => {
  const button = page.getByText('Магазин')
  await button.click()

  await expect(page).toHaveURL(/.*\/market/);

  const back = page.getByText('Главная');
  await back.click()

  await expect(page).toHaveURL('http://localhost:4200/');
})

test('Тест на навигацию в команды', async ({ page }) => {
  const button = page.getByText('Команды');
  await button.click();

  await expect(page).toHaveURL(/.*\/teams/);
});
