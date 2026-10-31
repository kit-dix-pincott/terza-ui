import { TestBed } from '@angular/core/testing';
import { Ui } from '../../index';

describe('Ui', () => {
  describe('rendering', () => {
    it('renders the placeholder text', async () => {
      const fixture = TestBed.createComponent(Ui);

      await fixture.whenStable();

      const host = fixture.nativeElement as HTMLElement;
      const text = host.querySelector('[data-testid="ui-placeholder"]');
      expect(text?.textContent?.trim()).toBe('Ui works!');
    });
  });
});
