import React from 'react';
import { TypographyProps } from './Typography.types';
import './Typography.scss';

const variantMapping = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
    body1: 'p',
    body2: 'p',
    caption: 'span',
    overline: 'span',
    display: 'h1',
    accent: 'span'
} as const;

const defaultFamilyMapping = {
    h1: 'display',
    h2: 'display',
    h3: 'display',
    h4: 'display',
    h5: 'display',
    h6: 'display',
    body1: 'body',
    body2: 'body',
    caption: 'body',
    overline: 'body',
    display: 'display',
    accent: 'accent'
} as const;

export const Typography: React.FC<TypographyProps> = ({
    variant = 'body1',
    component,
    family,
    weight = 'normal',
    size,
    color = 'primary',
    align = 'left',
    children,
    className = '',
    ...props
}) => {
    const Component = component || variantMapping[variant];

    // Se não especificou family, usa o padrão do variant
    const fontFamily = family || defaultFamilyMapping[variant];

    const classes = [
        'ui-typography',
        `ui-typography--${variant}`,
        `ui-typography--family-${fontFamily}`,
        `ui-typography--weight-${weight}`,
        size && `ui-typography--size-${size}`,
        `ui-typography--color-${color}`,
        `ui-typography--align-${align}`,
        className
    ].filter(Boolean).join(' ');

    return (
        <Component className={classes} {...props}>
            {children}
        </Component>
    );
};