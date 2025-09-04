import type { Preview } from '@storybook/react';

import '../src/styles/fonts.scss';
import '../src/styles/tokens.scss';
import '../src/styles/global.scss';
import '../src/styles/typography.scss';

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
        backgrounds: {
            default: 'light',
            values: [
                {
                    name: 'light',
                    value: '#ffffff',
                },
                {
                    name: 'dark',
                    value: '#1a1a1a',
                },
            ],
        },
    },
};

export default preview;