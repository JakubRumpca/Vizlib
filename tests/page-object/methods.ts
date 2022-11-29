import { Page } from '@playwright/test';

export class Methods {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private userNameInput = '[placeholder="Type your email here"] input';
  private passwordInput = '[placeholder="Type your password here"]';
  private userEmail = '[class="account__email"]';
  private menuTitle = '[class="menu__title-name"]';
  private workbookList = 'gucci-workbooks-list';

  async login(username, password){
    await this.page.fill(this.userNameInput, username)
    const hPassword = await this.page.waitForSelector(this.passwordInput);
    await hPassword.fill(password);
    await this.page.getByRole('button', { name: 'Continue' }).click();
    await this.page.waitForSelector(this.menuTitle);
  }
  
  async getLoggedUserName() {
    await this.page.getByTestId('user-avatar').getByRole('button', { name: 'Jakub Rumpca J' }).click();
    await this.page.waitForSelector('[data-testid="dropdown-items"]');
    const text = await this.page.$eval(this.userEmail, el => el.textContent);
    return text;
  }

  async importOrDeleteData(action: "Import" | "Delete"){
    await this.page.getByRole('button', { name: 'Administration' }).click();
    await this.page.getByTestId('administration-system-settings').getByRole('button', { name: 'View' }).click();
    await this.page.getByRole('button', { name: action }).click();
    if (action === "Import"){
      await this.page.getByText('The Demo assets are now available in the Workbook section.').waitFor();
    }  
    if (action === "Delete"){
      await this.page.getByRole('button', { name: action }).click();
      await this.page.getByRole('button', { name: "Import" }).waitFor();
    }   
  }

  async checkIfDataIsAdded(data){
    await this.page.getByRole('button', { name: 'Workbooks' }).click();
    await this.page.waitForSelector(this.menuTitle);
    await this.page.getByText(data).waitFor();
    const text = await this.page.$eval(this.workbookList, el => el.textContent);
    return text;
  }

  async checkIfDataIsRemoved(){
    await this.page.getByRole('button', { name: 'Workbooks' }).click();
    await this.page.waitForSelector(this.menuTitle);
    const text = await this.page.$eval(this.workbookList, el => el.textContent);
    return text;
  }
}
