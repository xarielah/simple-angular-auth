import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthUser } from '../../interfaces/user.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  readonly fb = inject(FormBuilder);
  readonly authService = inject(AuthService);
  readonly route = inject(Router);
  private destroy$ = inject(DestroyRef);

  loginForm = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  ngOnInit() {
    this.authService.$isLoading
      .pipe(takeUntilDestroyed(this.destroy$))
      .subscribe((isLoading) => {
        if (isLoading) this.loginForm.disable();
        else this.loginForm.enable();
      });
  }

  onSubmit() {
    this.authService
      .login(this.loginForm.value as AuthUser)
      .subscribe((user) => {
        console.log('login successful', user);
        this.route.navigate(['/'], { replaceUrl: true });
      });
  }
}
