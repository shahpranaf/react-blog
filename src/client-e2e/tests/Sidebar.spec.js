import { test, expect } from '@playwright/test';
import { loadMockedCategories, loadMockedPosts } from '../actions/loadMockedData';

let baseURL;
test.beforeEach(async ({ page }, config) => {
    baseURL = config.project?.use?.baseURL;

    /* Mock the POSTS API */
    loadMockedPosts(page);

    /* Mock the Categories API */
    loadMockedCategories(page);

    await page.goto(baseURL);
    
});

test.describe('Verify Sidebar', () => {
    test('Should load the Sidebar', async ({ page }) => {
        await expect(
            page.getByText(/about me/i)
          ).toBeVisible();       
    })

    test('Should load the Mocked Categories', async ({ page }) => {
        await expect(
            page.getByText(/categories/i)
          ).toBeVisible();
    });

    test('Should load exact 5 Mocked Categories', async ({ page }) => {
        await page.locator('.sidebarItem').first().waitFor();
        const postsCount = await page.locator('.sidebarListItem').count()
       
        await expect(postsCount).toEqual(5)
    });
})

