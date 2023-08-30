import { test, expect } from '@playwright/test';
import MockedPosts from '../fixtures/Posts.json';
import singlePost from '../fixtures/singlePost.json';
import { URL_SEGMENT } from '../../utils/constant';

let baseURL;
let USERNAME;
let PASSWORD;

test.beforeEach(async ({ page }, config) => {
    baseURL = config.project?.use?.baseURL;
    USERNAME = process.env.REACT_APP_USER_NAME;
    PASSWORD = process.env.REACT_APP_PASSWORD;
    await page.goto(baseURL);
});

test.describe('Should be able to create post', () => {
    test('Should not be able to create without login', async ({ page }) => {
        const writeMenu = page.getByRole('link', { name: /write/i});
        
        await expect(writeMenu).toBeVisible();
        await writeMenu.click();
        await expect(page).toHaveURL(`${baseURL}/${URL_SEGMENT.LOGIN}`); 
        await expect(page).not.toHaveURL(`${baseURL}/${URL_SEGMENT.WRITE}`);
    })

    test('Should be able to create after login', async ({ page }) => {
        /* Login first to write */
        // await page.goto(`${baseURL}/${URL_SEGMENT.LOGIN}`)

        /* Added this repeated code because github do not support refresh of REACT APP */
        await page.goto(baseURL);
        const loginMenu = page.getByRole('link', { name: /login/i});
        await expect(loginMenu).toBeVisible();
        await loginMenu.click();
        /* End: Added this repeated code because github do not support refresh of REACT APP */
        
        await expect(page).toHaveURL(`${baseURL}/${URL_SEGMENT.LOGIN}`); 

        await page.getByLabel(/username/i ).click();
        await page.getByLabel(/username/i ).fill(USERNAME); 
        
        await page.getByLabel(/password/i).click();
        await page.getByLabel(/password/i).fill(PASSWORD); 

        await page.getByRole('button', { name: /login/i}).click();
        await expect(page).toHaveURL(baseURL);
    

        /* Wait until we update currentUser State */
        const logOutMenu = page.getByRole('link', { name: /logout/i});
        await expect(logOutMenu).toBeVisible();
        
        /* Click Write Menu */
        const writeMenu = page.getByRole('link', { name: /write/i});
        await page.getByRole('link', { name: /logout/i});

        await expect(writeMenu).toBeVisible();
        await writeMenu.click();
        
        await expect(page).toHaveURL(`${baseURL}/${URL_SEGMENT.WRITE}`); 

        const previousMockedPostLength = MockedPosts?.length;
        
        /* Mock the response and add newly added post to the list */
        await page.route('*/**/wp-json/wp/v2/posts', async (route) => {
            const json = {
                id: 100,
                title: singlePost?.title?.rendered,
                content: singlePost?.content?.rendered
            };
            MockedPosts.push(json);
            await route.fulfill({ json });
        });
        /* Start Writing Blog */
        await page.getByPlaceholder(/title/i).click()
        await page.getByPlaceholder(/title/i).fill(singlePost?.title?.rendered);
        await page.locator("textarea").fill(singlePost?.content?.rendered);

        /* Publish the Blog */
        await page.getByRole('button', { name: /publish/i}).click();

        /* Verify after publis */
        await expect(MockedPosts?.length).toBe(previousMockedPostLength+1);

        const lastPost = MockedPosts[MockedPosts.length-1];
        await expect(lastPost.title).toEqual(singlePost?.title.rendered);
        await expect(lastPost.content).toEqual(singlePost?.content.rendered);

    })
})

