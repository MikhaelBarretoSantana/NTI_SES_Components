import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
    stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
        '@storybook/addon-essentials',
    ],
    framework: {
        name: '@storybook/react-vite',
        options: {},
    },
    // Configurar Vite para processar CSS corretamente
    viteFinal: async (config) => {
        config.css = config.css || {};
        config.css.postcss = config.css.postcss || {};
        return config;
    },
};

export default config;