import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import React from 'react';

export type InputType =
    | 'text'
    | 'email'
    | 'password'
    | 'number'
    | 'tel'
    | 'url'
    | 'search'
    | 'date'
    | 'time'
    | 'datetime-local'
    | 'month'
    | 'week'
    | 'color'
    | 'file'
    | 'hidden'
    | 'range';

export type InputVariant = 'default' | 'filled' | 'outlined' | 'ghost';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
    // Propriedades básicas
    label?: string;
    type?: InputType;
    variant?: InputVariant;
    size?: 'small' | 'medium' | 'large';

    // Estados
    error?: string | boolean;
    success?: string | boolean;
    warning?: string | boolean;
    loading?: boolean;

    // Aparência
    leftIcon?: IconDefinition;
    rightIcon?: IconDefinition;
    leftAddon?: React.ReactNode; // Mantém ReactNode para texto
    rightAddon?: React.ReactNode; // Mantém ReactNode para texto

    // Funcionalidades especiais
    clearable?: boolean;
    showPassword?: boolean; // Para type="password"
    counter?: boolean; // Para mostrar contador de caracteres

    // Textos auxiliares
    helperText?: string;

    // Callbacks adicionais
    onClear?: () => void;
    onIconClick?: (position: 'left' | 'right') => void;

    // Referências
    containerRef?: React.Ref<HTMLDivElement>;

    // Classes customizáveis
    containerClassName?: string;
    labelClassName?: string;
    fieldClassName?: string;
    helperClassName?: string;
    errorClassName?: string;
}