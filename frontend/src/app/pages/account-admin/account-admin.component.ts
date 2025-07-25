import { Component, Type } from '@angular/core';
import { AccountInfoTabComponent } from '../../components/account-info-tab/account-info-tab.component';
import { ButtonComponent } from '../../shared/button/button.component';
import { TabsComponent } from '../../components/tabs/tabs.component';
import { ChangePasswordTabComponent } from '../../components/change-password-tab/change-password-tab.component';
import { AllAccountsComponent } from '../../components/all-accounts/all-accounts.component';
import { AddNewAccountComponent } from '../../components/add-new-account/add-new-account.component';
import { DeleteAccountComponent } from '../../components/delete-account/delete-account.component';

@Component({
  selector: 'app-account-admin',
  imports: [TabsComponent],
  templateUrl: './account-admin.component.html',
  styleUrl: './account-admin.component.css'
})
export class AccountAdminComponent {
  tabList: { label: string; value: string; content: Type<any> }[] = [
    { label: 'Account Info', value: 'account-info', content: AccountInfoTabComponent },
    { label: 'Change Password', value: 'change-password', content: ChangePasswordTabComponent },
    { label: 'All Accounts', value: 'all-accounts', content: AllAccountsComponent },
    { label: 'Add New Account', value: 'add-new-account', content: AddNewAccountComponent },
    { label: 'Delete Account', value: 'delete-account', content: DeleteAccountComponent },
  ];
}
