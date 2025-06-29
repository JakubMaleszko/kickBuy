import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  readonly auth = inject(Auth);
  readonly router = inject(Router);
  loginForm = new FormGroup({
    username: new FormControl('', { validators: [Validators.required] }),
    passwd: new FormControl('', { validators: [Validators.required, Validators.minLength(6)] })
  });
  hide = signal(true);
  invalidCredentials = signal(false)
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  login() {
    const { username, passwd } = this.loginForm.value;
    this.auth.login(username!, passwd!).subscribe(success => {
      if (success) {
        this.router.navigate(['home']);
      } else {
        this.invalidCredentials.set(true);
      }
    });

  }
}