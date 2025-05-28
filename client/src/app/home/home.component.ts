import { Component, inject, OnInit } from '@angular/core';
import { RegisterComponent } from "../register/register.component";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  http = inject(HttpClient);
  registerMode = false;
    
  users: any;
ngOnInit() : void {
    console.log('HomeComponent initialized');   
    this.getUsers();
  }

  toggleRegister() {
    this.registerMode = !this.registerMode;
  }   
  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
    console.log('Register mode cancelled:', this.registerMode);
  }
  
  getUsers() {
    this.http.get('https://localhost:5001/api/users').subscribe({
      next: response =>this.users = response,
      error: error => {error},
      complete: () => console.log('Request completed')  
    })  
  }   
}
  // 