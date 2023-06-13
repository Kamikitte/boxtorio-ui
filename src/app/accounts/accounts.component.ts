import { Component } from '@angular/core';
import { Account } from '../account';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-account',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent {

  showList;
  showCreationForm;
  accounts?: Account[];

  name? : string;
  email? : string;
  password? : string;
  retryPassword? : string;
  role? : string;

  constructor(private accountService: AccountService) {
    this.showList = true;
    this.showCreationForm = false;
    this.getAccounts();
  }

  createAccount(): void {    
    this.accountService.createAccount(this.name!, this.name!, this.password!, this.retryPassword!, this.role!)
      .subscribe((result) => console.log(result));
  }

  createFromForm()
  {
    this.createAccount();
    this.openList();
  }

  openForm()
  {
    this.showList = false;
    this.showCreationForm = true;
  }

  openList()
  {
    this.getAccounts();
    this.showList = true;
    this.showCreationForm = false;
  }
  
  getAccounts(): void {
    this.accountService.getAccounts()
      .subscribe((result) => {
        this.accounts = result
      });
  }
}
