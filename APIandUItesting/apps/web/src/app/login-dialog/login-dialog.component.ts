import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-dialog',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-dialog.component.html',
  styleUrl: './login-dialog.component.scss',
})
export class LoginDialogComponent {
  @Output() closed = new EventEmitter<void>();
  @Output() loggedIn = new EventEmitter<void>();

  username = '';
  password = '';
  errorMessage = '';
  infoMessage = '';

  constructor(private readonly auth: AuthService) {}

  onSubmit(): void {
    this.errorMessage = '';
    this.auth.login(this.username, this.password).subscribe({
      next: () => this.loggedIn.emit(),
      error: () => {
        this.errorMessage = 'Invalid username or password.';
      },
    });
  }

  onForgotPassword(): void {
    this.errorMessage = '';
    this.infoMessage = 'If this were real, a password reset link would be sent to your email.';
  }

  onRegister(): void {
    this.errorMessage = '';
    this.infoMessage = 'Registration is not available in this demo.';
  }

  onOverlayClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.closed.emit();
    }
  }

  onClose(): void {
    this.closed.emit();
  }
}
