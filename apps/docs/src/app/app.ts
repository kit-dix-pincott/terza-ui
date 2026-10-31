import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Root shell of the documentation site: a single main landmark that hosts
 * the routed pages.
 */
@Component({
  imports: [RouterOutlet],
  selector: 'tz-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
