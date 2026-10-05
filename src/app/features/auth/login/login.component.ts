import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { UserRole } from '../../../core/models/user.model';
import { apiErrorMessage } from '../../../core/services/api.service';

/** Where each role lands right after login, when there's no returnUrl to honour. */
const ROLE_LANDING_ROUTE: Record<UserRole, string> = {
  owner: '/dashboard',
  admin: '/dashboard',
  manager: '/dashboard',
  accountant: '/dashboard',
  cashier: '/pos',
  inventory_staff: '/inventory',
};

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const { email, password, rememberMe } = this.loginForm.value;

    this.authService.login(email, password, !!rememberMe).subscribe({
      next: (user) => {
        // Cashier/Owner/etc. each land on the page most relevant to their role
        // (e.g. cashier -> POS) instead of everyone being sent to the admin dashboard.
        const roleLanding = ROLE_LANDING_ROUTE[user.role] ?? '/dashboard';

        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
        const safeReturnUrl = returnUrl && returnUrl.startsWith('/') && !returnUrl.startsWith('//')
          ? returnUrl
          : roleLanding;

        this.isLoading = false;
        this.router.navigateByUrl(safeReturnUrl);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = apiErrorMessage(err);
      },
    });
  }
}
