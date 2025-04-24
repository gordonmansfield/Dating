import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  http = inject(HttpClient);
  users: any;
  title = 'Hi Zechariah! Welcome to your Angular app!';

  ngOnInit(): void {
    this.http.get('https://localhost:5001/api/users').subscribe({
      next: response =>this.users = response,
      error: error => {error},
      complete: () => console.log('Request completed')  
    })  
  }
  
}


