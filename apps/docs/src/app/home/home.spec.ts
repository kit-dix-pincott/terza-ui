import { TestBed } from '@angular/core/testing';
import { Home } from './home';

describe('Home', () => {
  describe('rendering', () => {
    it('renders the library name as the page heading', async () => {
      const fixture = TestBed.createComponent(Home);

      await fixture.whenStable();

      const host = fixture.nativeElement as HTMLElement;
      expect(host.querySelector('h1')?.textContent?.trim()).toBe('terza-ui');
    });

    it('renders the pitch', async () => {
      const fixture = TestBed.createComponent(Home);

      await fixture.whenStable();

      const host = fixture.nativeElement as HTMLElement;
      const pitch = host.querySelector('[data-testid="pitch"]');
      expect(pitch?.textContent).toContain('takes a third way');
    });

    it('renders the library placeholder component as a live example', async () => {
      const fixture = TestBed.createComponent(Home);

      await fixture.whenStable();

      const host = fixture.nativeElement as HTMLElement;
      expect(host.querySelector('tz-ui')).not.toBeNull();
    });
  });
});
