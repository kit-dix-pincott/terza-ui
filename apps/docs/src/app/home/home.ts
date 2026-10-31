import { Component } from '@angular/core';
import { Ui } from 'terza-ui';

/**
 * Landing page: the library's pitch and a live example rendered from the
 * library itself.
 */
@Component({
  imports: [Ui],
  selector: 'tz-home',
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
