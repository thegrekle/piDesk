import { PiDeskPage } from './app.po';

describe('pi-desk App', () => {
  let page: PiDeskPage;

  beforeEach(() => {
    page = new PiDeskPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
