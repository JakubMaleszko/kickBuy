import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toolbar } from '../components/toolbar/toolbar';

@Component({
  selector: 'app-pages',
  imports: [RouterOutlet, Toolbar],
  templateUrl: './pages.html'
})
export class Pages {

}
