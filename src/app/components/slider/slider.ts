import { Component, computed, Input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-slider',
  imports: [MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './slider.html',
  styleUrl: './slider.scss'
})
export class Slider {
  @Input() images: string[] = [];
  currentIndex = signal(0);
  readonly canGoPrev = computed(() => this.currentIndex() > 0);
  readonly canGoNext = computed(() => this.currentIndex() < this.images.length - 1);
  readonly currentImage = computed(() => this.images[this.currentIndex()]);

  prev() {
    if (this.canGoPrev()) {
      this.currentIndex.update(i => i - 1);
    }
  }

  next() {
    if (this.canGoNext()) {
      this.currentIndex.update(i => i + 1);
    }
  }
}
