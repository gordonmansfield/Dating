import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, BsDropdownModule],
  templateUrl: './nav.component.html',
  providers: [{provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true }}],
  styleUrl: './nav.component.css'
})


export class NavComponent {
accountService= inject(AccountService);
model: any = {};

 login() {
   console.log(this.model);
   this.accountService.login(this.model).subscribe(response => {
     console.log(response);
   }, error => {
     console.log(error);
   });
 }  
  logout() {
    //this.accountService.logout();
    this.accountService.logout();
    console.log('Logged out');
  } 
}
