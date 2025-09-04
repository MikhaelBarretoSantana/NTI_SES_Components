import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from './Typography';
import React from 'react';

const meta: Meta<typeof Typography> = {
    title: 'Components/Typography',
    component: Typography,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AllVariants: Story = {
    render: () => (
        <div>
            <Typography variant="h1">Heading 1</Typography>
            <Typography variant="h2">Heading 2</Typography>
            <Typography variant="h3">Heading 3</Typography>
            <Typography variant="h4">Heading 4</Typography>
            <Typography variant="h5">Heading 5</Typography>
            <Typography variant="h6">Heading 6</Typography>
            <Typography variant="body1">
                This is body1 text with Inter font family. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Typography>
            <Typography variant="body2">
                This is body2 text, smaller than body1. Sed do eiusmod tempor incididunt ut labore.
            </Typography>
            <Typography variant="caption">This is caption text - useful for metadata</Typography>
            <Typography variant="overline">This is overline text</Typography>
        </div>
    ),
};

export const WeightVariations: Story = {
    render: () => (
        <div>
            <Typography weight="light">Light weight text</Typography>
            <Typography weight="normal">Normal weight text</Typography>
            <Typography weight="medium">Medium weight text</Typography>
            <Typography weight="semibold">Semibold weight text</Typography>
            <Typography weight="bold">Bold weight text</Typography>
        </div>
    ),
};