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
            <Typography weight="extralight">Extra Light weight text</Typography>
            <Typography weight="light">Light weight text</Typography>
            <Typography weight="normal">Normal weight text</Typography>
            <Typography weight="medium">Medium weight text</Typography>
            <Typography weight="semibold">Semibold weight text</Typography>
            <Typography weight="bold">Bold weight text</Typography>
            <Typography weight="extrabold">Extra Bold weight text</Typography>
            <Typography weight="black">Black weight text</Typography>
        </div>
    ),
};

export const FontFamilies: Story = {
    render: () => (
        <div>
            <Typography family="display" size="xl">Outfit (Display) - Modern and geometric</Typography>
            <Typography family="body" size="xl">Inter (Body) - Readable and versatile</Typography>
            <Typography family="accent" size="xl">Gibralt (Accent) - Premium with personality</Typography>
        </div>
    ),
};

export const GibraltShowcase: Story = {
    render: () => (
        <div style={{ fontFamily: 'Gibralt, Helvetica Neue, Arial, sans-serif' }}>
            <h2 style={{ fontFamily: 'Inter, sans-serif', marginBottom: '20px' }}>
                Gibralt Font Showcase
            </h2>
            
            <div style={{ marginBottom: '20px' }}>
                <p style={{ fontWeight: 200, fontSize: '24px', margin: '10px 0' }}>
                    Extra Light (200) - The quick brown fox jumps over the lazy dog
                </p>
            </div>
            
            <div style={{ marginBottom: '20px' }}>
                <p style={{ fontWeight: 400, fontSize: '24px', margin: '10px 0' }}>
                    Regular (400) - The quick brown fox jumps over the lazy dog
                </p>
            </div>
            
            <div style={{ marginBottom: '20px' }}>
                <p style={{ fontWeight: 700, fontSize: '24px', margin: '10px 0' }}>
                    Bold (700) - The quick brown fox jumps over the lazy dog
                </p>
            </div>
            
            <div style={{ marginBottom: '20px' }}>
                <p style={{ fontWeight: 900, fontSize: '24px', margin: '10px 0' }}>
                    Black (900) - The quick brown fox jumps over the lazy dog
                </p>
            </div>
        </div>
    ),
};

export const AccentVariants: Story = {
    render: () => (
        <div>
            <Typography family="accent" weight="extralight" size="2xl">
                Gibralt Extra Light
            </Typography>
            <Typography family="accent" weight="normal" size="2xl">
                Gibralt Regular
            </Typography>
            <Typography family="accent" weight="bold" size="2xl">
                Gibralt Bold
            </Typography>
            <Typography family="accent" weight="black" size="2xl">
                Gibralt Black
            </Typography>
        </div>
    ),
};