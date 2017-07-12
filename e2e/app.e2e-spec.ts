import { CheckoutCartPage } from './app.po';

describe('checkout-cart App', () => {
  let page: CheckoutCartPage;

  beforeEach(() => {
    page = new CheckoutCartPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
