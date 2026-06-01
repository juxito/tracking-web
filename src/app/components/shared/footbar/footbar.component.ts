import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footbar.component.html'
})
export class FootbarComponent {
  @Input() collapsed = false;
}