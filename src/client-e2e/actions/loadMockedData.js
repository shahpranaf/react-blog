import MockedPosts from '../fixtures/Posts.json';
import MockedCategories from '../fixtures/Categories.json';

/* Function to Mock Posts */
export const loadMockedPosts = async(page) => {
    await page.route('*/**/wp-json/wp/v2/posts', async route => {
        const json = MockedPosts;
        await route.fulfill({ json });
    });
}

/* Function to Mock Categories */
export const loadMockedCategories = async(page) => {
    await page.route('*/**/wp-json/wp/v2/categories', async route => {
        const json = MockedCategories;
        await route.fulfill({ json });
    });
}