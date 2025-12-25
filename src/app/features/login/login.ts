import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onLogin() {
    if (this.form.invalid) return;
    const { email, password } = this.form.value;

    this.authService
      .login(email!, password!)
      .then(() => this.router.navigate(['/']))
      .catch((err) => alert('Login failed: ' + err.message));
  }

  onRegister() {
    if (this.form.invalid) return;
    const { email, password } = this.form.value;

    this.authService
      .register(email!, password!)
      .then(() => this.router.navigate(['/']))
      .catch((err) => alert('Registration failed: ' + err.message));
  }
}
