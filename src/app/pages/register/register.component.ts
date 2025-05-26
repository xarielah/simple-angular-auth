import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  readonly fb = inject(FormBuilder);
  readonly authService = inject(AuthService);
  readonly route = inject(Router);
  private destroy$ = inject(DestroyRef);

  registerForm = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  ngOnInit() {
    this.authService.$isLoading
      .pipe(takeUntilDestroyed(this.destroy$))
      .subscribe((isLoading) => {
        if (isLoading) this.registerForm.disable();
        else this.registerForm.enable();
      });
  }

  onSubmit() {
    console.log('form:', this.registerForm.value);
    this.authService
      .register({
        username: this.registerForm.value.username!,
        email: this.registerForm.value.email!,
        password: this.registerForm.value.password!,
      })
      .subscribe({
        next: () => {
          this.route.navigate(['/'], { replaceUrl: true });
          console.log('register successful');
        },
      });
  }
}
