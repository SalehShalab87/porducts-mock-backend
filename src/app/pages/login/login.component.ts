import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { TranslatePipe } from '../../i18n/translate.pipe';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,TranslatePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;
  isLoginFailed: boolean = false;
  
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit() {
    this.initializeLoginForm();
  }

  initializeLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(){
    const userEmail = this.loginForm.value.email; 
    const userPassword = this.loginForm.value.password
    this.authService.isUserExists(userEmail,userPassword).subscribe((users) => {
      if(users.length > 0) {;
        localStorage.setItem('token', 'mock-token');
        this.authService.login(users[0]);
        this.router.navigateByUrl(this.authService.getredirectUrl() ? this.authService.getredirectUrl() : '/');
      }else{
        this.isLoginFailed = true;
      }
    })
  }

  goToRegisterPage(){
    this.router.navigateByUrl('/sign-up');
  }

}
