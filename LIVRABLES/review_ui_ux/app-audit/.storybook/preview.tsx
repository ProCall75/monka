import type { Preview } from '@storybook/nextjs-vite';
import '../app/globals.css';

const MONKA_VIEWPORTS = {
  iphoneSE: {
    name: 'iPhone SE',
    styles: { width: '375px', height: '667px' },
  },
  iphone15: {
    name: 'iPhone 15',
    styles: { width: '393px', height: '852px' },
  },
  iphone15ProMax: {
    name: 'iPhone 15 Pro Max',
    styles: { width: '430px', height: '932px' },
  },
  galaxyS21: {
    name: 'Samsung Galaxy S21',
    styles: { width: '360px', height: '800px' },
  },
};

const preview: Preview = {
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'Monka Warm',
      values: [
        { name: 'Monka Warm', value: '#F8F4EF' },
        { name: 'Monka Surface', value: '#FFFFFF' },
        { name: 'Dark', value: '#1A1A1A' },
      ],
    },
    viewport: {
      viewports: MONKA_VIEWPORTS,
      defaultViewport: 'iphone15',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          maxWidth: '393px',
          margin: '0 auto',
          padding: '16px',
          fontFamily: "'Outfit', 'Inter', system-ui, sans-serif",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default preview;