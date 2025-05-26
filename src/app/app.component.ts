import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
  providers: [RouterLink, RouterOutlet],
})
export class AppComponent implements OnInit {
  authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.getUser();
  }

  logout() {
    this.authService.logout();
  }
}
