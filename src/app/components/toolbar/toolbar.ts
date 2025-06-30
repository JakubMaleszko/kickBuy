import { Component, inject } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { UserStore } from '../../store/user-store';


@Component({
  selector: 'app-toolbar',
  imports: [MatToolbar, MatIcon, MatButtonModule, RouterLink ],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.scss'
})
export class Toolbar {
    readonly store = inject(UserStore);
  ngOnInit(): void {
    this.store.fetchUser();
  }
}
