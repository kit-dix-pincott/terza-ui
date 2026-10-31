import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { App } from './app';
import { appRoutes } from './app.routes';

describe('App', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter(appRoutes)],
    });
  });

  describe('routing', () => {
    it('renders the landing page inside the main landmark at the root path', async () => {
      const fixture = TestBed.createComponent(App);

      await TestBed.inject(Router).navigateByUrl('/');
      await fixture.whenStable();

      const host = fixture.nativeElement as HTMLElement;
      expect(host.querySelector('main h1')?.textContent?.trim()).toBe(
        'terza-ui',
      );
    });

    it('titles the landing page with the library name', async () => {
      TestBed.createComponent(App);

      await TestBed.inject(Router).navigateByUrl('/');

      expect(document.title).toBe('terza-ui');
    });
  });
});
