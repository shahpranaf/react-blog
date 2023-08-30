import { test, expect } from '@playwright/test';
import MockedPosts from '../fixtures/Posts.json';
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

test.describe('HomePage', () => {
    test('should render the blog page', async ({ page }) => {
        await expect(page).toHaveURL(baseURL+"/");  
    });

    test('Should have all the menus', async ({ page }) => {
        await expect(
            page.getByRole('link', { name: /home/i})
          ).toBeVisible();
        await expect(
            page.getByRole('link', { name: /about/i})
          ).toBeVisible();
        await expect(
            page.getByRole('link', { name: /contact/i})
          ).toBeVisible();
        await expect(
            page.getByRole('link', { name: /write/i})
          ).toBeVisible();
    })

    test('Should not be Logged in', async ({ page }) => {
        await expect(
            page.getByRole('link', { name: /logout/i})
          ).not.toBeVisible();
    })

    test('Should load the blogs/posts', async ({ page }) => {
        await expect(
            page.getByText(MockedPosts[0]?.title?.rendered)
          ).toBeVisible();
    })

    test('Should load exact 3 Mocked posts', async ({ page }) => {
        await page.locator('.posts').first().waitFor();
        const postsCount = await page.locator('.post').count()
       
        await expect(postsCount).toEqual(3)
    })
})

