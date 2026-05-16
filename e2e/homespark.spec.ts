import { test, expect } from '@playwright/test';

test.describe('Homespark E-shop E2E', () => {
  test('should load the home page and verify hero and sections', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/Homespark/i);

    // Hero
    await expect(page.locator('text=Štýlový domov')).toBeVisible();
    await expect(page.locator('text=začína tu.')).toBeVisible();

    // Sections
    await expect(page.locator('text=Bestsellery')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Novinky' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Kategórie' })).toBeVisible();
  });

  test('should load product detail page and add to cart', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));

    await page.goto('/produkt/sh-001');

    const h1 = page.locator('h1');
    await expect(h1).toBeVisible({ timeout: 10000 }).catch(e => {
      console.log('Page errors:', errors);
      throw e;
    });

    await expect(h1).toContainText('Inteligentný');

    const addToCartBtn = page.getByRole('button', { name: /Pridať do košíka/i });
    await expect(addToCartBtn).toBeVisible();
    await addToCartBtn.click();

    await expect(page.locator('text=Pridané do košíka')).toBeVisible();
  });
});
