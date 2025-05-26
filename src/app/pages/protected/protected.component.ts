import { Component, inject, OnInit } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-protected',
  standalone: false,
  templateUrl: './protected.component.html',
  styleUrl: './protected.component.css',
})
export class ProtectedComponent implements OnInit {
  readonly authService = inject(AuthService);
  user!: User;

  ngOnInit() {
    this.user = this.authService.getUser()!;
  }
}
