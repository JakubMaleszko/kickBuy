import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbarModule, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  
}
