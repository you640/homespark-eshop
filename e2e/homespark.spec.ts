import { test, expect } from '@playwright/test';

test.describe('Homespark E-shop E2E', () => {
  test('should load the home page and verify sections', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/Homespark/i);
    await expect(page.locator('text=Luxusné bývanie s Homespark')).toBeVisible();
    await expect(page.locator('text=Najpredávanejšie produkty')).toBeVisible();
    await expect(page.locator('text=Horúce novinky')).toBeVisible();
  });

  test('should load product detail page and add to cart', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });

    // Navigate directly to a specific product
    await page.goto('/produkt/sh-001');

    // Wait for the h1 to appear (loading state completes)
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible({ timeout: 10000 }).catch(e => {
      console.log('Errors caught during navigation:', errors);
      throw e;
    });
    
    // Verify it contains the name
    await expect(h1).toContainText('Inteligentný');

    const addToCartBtn = page.getByRole('button', { name: /Pridať do košíka/i });
    await expect(addToCartBtn).toBeVisible();
    await addToCartBtn.click();

    // Verify toast notification appears
    await expect(page.locator('text=Pridané do košíka')).toBeVisible();
  });
});
