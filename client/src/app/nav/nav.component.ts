import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, BsDropdownModule, RouterLink, RouterLinkActive, TitleCasePipe],
  templateUrl: './nav.component.html',
  providers: [{provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true }}],
  styleUrl: './nav.component.css'
})


export class NavComponent {
accountService= inject(AccountService);
private router = inject(Router);
private toastr = inject(ToastrService);
model: any = {};

 login() {
    this.accountService.login(this.model).subscribe({
     next: () => {
        this.router.navigateByUrl('/members');
        this.toastr.success('Logged in successfully');
     },
     error: error => this.toastr.error(error.error)
   })
 }  
  logout() {
    //this.accountService.logout();
    this.accountService.logout();
    this.router.navigateByUrl('/');
    this.toastr.info('Logged out');
  }
}
