import type { Meta, StoryObj } from '@storybook/angular';
import { Ui } from './ui';

const meta: Meta<Ui> = {
  component: Ui,
  title: 'Ui',
};
export default meta;

/** A story of the placeholder component. */
type Story = StoryObj<Ui>;

/** The placeholder as generated, with no inputs. */
export const Default: Story = {};
