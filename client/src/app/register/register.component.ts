import { Component, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private accountService = inject(AccountService);
  private toastr = inject(ToastrService);
  cancelRegister = output<boolean>();
model: any = {};
  register() {
    console.log('User registered:', this.model);
    this.accountService.register(this.model).subscribe({
      next: response => {
        console.log('Registration successful:', response);
        this.cancel;
      },
      error: error => {
        this.toastr.error(error.error);
        console.error('Registration failed:', error);
        // Handle registration error, e.g., show an error message
      } 
    })
  } 
  cancel() {
    this.cancelRegister.emit(false);
    
    console.log('Registration cancelled message sent');

    // Logic to handle cancellation, e.g., redirecting to another page
  } 
}
