import { test, expect, logger } from '@playwright/experimental-ct-react';
import Topbar from './Topbar';

// test.use({ viewport: { width: 500, height: 500 } });


test('Menu Links to be Visible', async ({ mount }) => {
  const component = await mount(<Topbar />);
  const menu = component.getByTestId('menu');

  console.log(menu.getByRole('link'))
  
  await expect(menu.getByRole('link')).toHaveText();
});