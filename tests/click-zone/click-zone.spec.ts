import { expect, test } from '@playwright/test';

const basicBalance = 150;

test.beforeEach(async ({ page }) => {
  await page.route(`**/register`, async (route) => {
    const json = { balance: basicBalance };
    await route.fulfill({
      json: json,
      headers: { 'Access-Control-Allow-Origin': '*' },
    });
  });
});

test('Клик по монете увеличивает баланс', async ({ page }) => {
  await page.goto('/');
  const balanceDisplay = page.getByTestId('value');
  await expect(balanceDisplay).toContainText(String(basicBalance));

  const coin = page.getByTestId('coin');
  await coin.click();

  await expect(balanceDisplay).toContainText(String(basicBalance + 1), { timeout: 1500 });
});
