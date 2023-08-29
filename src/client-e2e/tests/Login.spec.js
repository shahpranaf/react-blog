import { test, expect } from '@playwright/test';
import { loadMockedCategories, loadMockedPosts } from '../actions/loadMockedData';
import { URL_SEGMENT } from '../../utils/constant';

let baseURL;
const USERNAME = process.env.REACT_APP_USER_NAME;
const PASSWORD = process.env.REACT_APP_PASSWORD;

test.beforeEach(async ({ page }, config) => {
    baseURL = config.project?.use?.baseURL;

    /* Mock the POSTS API */
    loadMockedPosts(page);

    /* Mock the Categories API */
    loadMockedCategories(page);

    await page.goto(baseURL);
    
});

test.describe('Verify Login Page', () => {
    test('Login page to be visible', async ({ page }) => {
        const loginMenu = page.getByRole('link', { name: /login/i});
        
        await expect(loginMenu).toBeVisible();
        await loginMenu.click();
        await expect(page).toHaveURL(`${baseURL}/${URL_SEGMENT.LOGIN}`); 
        await expect(
            page.getByLabel(/username/i )
          ).toBeVisible();       
    })
})

test.describe('Verify Login Page', () => {

    test('Should successfully log in', async ({ page }) => {
        await page.goto(`${baseURL}/${URL_SEGMENT.LOGIN}`)
        await expect(page).toHaveURL(`${baseURL}/${URL_SEGMENT.LOGIN}`); 
       
        await page.getByLabel(/username/i ).click();
        await page.getByLabel(/username/i ).fill(USERNAME); 
        
        await page.getByLabel(/password/i).click();
        await page.getByLabel(/password/i).fill(PASSWORD); 

        await page.getByRole('button', { name: /login/i}).click();

        await expect(page).toHaveURL(baseURL);

        await expect(page.getByText('Logged in successfully')).toBeVisible();
    })

    test('Should fail login on wrong credentials', async ({ page }) => {
        await page.goto(`${baseURL}/${URL_SEGMENT.LOGIN}`)
        await expect(page).toHaveURL(`${baseURL}/${URL_SEGMENT.LOGIN}`); 
       
        await page.getByLabel(/username/i ).click();
        await page.getByLabel(/username/i ).fill('123'); 
        
        await page.getByLabel(/password/i).click();
        await page.getByLabel(/password/i).fill('123'); 

        await page.getByRole('button', { name: /login/i}).click();

        await expect(page.locator('.errmsg')).toBeVisible();
    })
});

