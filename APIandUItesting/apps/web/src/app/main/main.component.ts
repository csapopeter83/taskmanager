import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [LoginDialogComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  showLoginDialog = false;

  constructor(private readonly router: Router) {}

  openLogin(): void {
    this.showLoginDialog = true;
  }

  closeLogin(): void {
    this.showLoginDialog = false;
  }

  onLoggedIn(): void {
    this.showLoginDialog = false;
    this.router.navigate(['/dashboard']);
  }
}
