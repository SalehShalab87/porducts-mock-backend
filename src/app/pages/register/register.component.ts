import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { TranslatePipe } from '../../i18n/translate.pipe';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,TranslatePipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm!: FormGroup;
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  emailExists: boolean = false;

  ngOnInit() {
    this.inilializeRegistraionForm();
  }

  inilializeRegistraionForm() {
    this.registerForm = this.fb.group(
      {
        userName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ mismatch: true });
    } else {
      form.get('confirmPassword')?.setErrors(null);
    }
  }

  onSubmit() {
    const email = this.registerForm.getRawValue().email;

    this.authService.isUserEmailExists(email).subscribe((users) => {
      if (users.length === 0) {
        this.emailExists = false;

        const user = {
          userName: this.registerForm.value.userName,
          email: this.registerForm.value.email,
          password: this.registerForm.value.password,
          role: 'user',
          avatar:'https://res.cloudinary.com/dvlo9lpxo/image/upload/v1746907687/user_uvercr.png',
        };

        this.authService.registerUser(user).subscribe((newUser) => {
          localStorage.setItem('token', 'mock-token');
          localStorage.setItem('username', newUser.userName);
          this.authService.login(newUser);

          const redirect = this.authService.getredirectUrl() || '/';
          this.router.navigateByUrl(redirect);
          this.authService.setredirectUrl('');
        });
      } else {
        this.emailExists = true;
        this.registerForm.get('email')?.setErrors({ emailExists: true });
      }
    });
  }
}
