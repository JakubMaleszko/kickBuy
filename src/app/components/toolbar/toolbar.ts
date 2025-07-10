import { Component, inject, signal } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { UserStore } from '../../store/user-store';
import { MatMenuModule } from '@angular/material/menu';
import { Auth } from '../../services/auth-service';


@Component({
  selector: 'app-toolbar',
  imports: [MatToolbar, MatIcon, MatButtonModule, RouterLink, MatMenuModule ],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.scss'
})
export class Toolbar {
  readonly store = inject(UserStore);
  private readonly auth = inject(Auth);
  private readonly router = inject(Router)
  ngOnInit(): void {
    this.store.fetchUser();
  }
  logout(): void {
    this.auth.logout();
    this.store.user = signal(null);
    this.router.navigate(['home'])
  }
}
