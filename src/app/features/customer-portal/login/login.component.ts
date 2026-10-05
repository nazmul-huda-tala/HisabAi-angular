import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CustomerPortalService } from '../services/customer-portal.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private portal: CustomerPortalService,
  ) {
    this.loginForm = this.fb.group({
      phone: ['01711112233', [Validators.required]],
      password: ['demo1234', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    const { phone, password } = this.loginForm.value;

    setTimeout(() => {
      this.isLoading = false;
      const ok = this.portal.login(phone, password);
      if (!ok) {
        this.errorMessage = 'ফোন নাম্বার বা পাসওয়ার্ড সঠিক নয়।';
        return;
      }
      const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
      const safeReturnUrl = returnUrl && returnUrl.startsWith('/portal') ? returnUrl : '/portal';
      this.router.navigateByUrl(safeReturnUrl);
    }, 300);
  }
}
