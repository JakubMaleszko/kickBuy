import { Component, inject, OnInit } from '@angular/core';
import { UserStore } from '../../store/user-store';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { Toolbar } from "../../components/toolbar/toolbar";

@Component({
  selector: 'app-profile',
  imports: [MatProgressBarModule, MatCardModule, Toolbar],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile implements OnInit{
  readonly store = inject(UserStore);
  ngOnInit(): void {
    this.store.fetchUser();
  }
}
