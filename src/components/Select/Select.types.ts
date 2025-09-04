import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import React from 'react';

export interface SelectOption {
    value: string | number;
    label: string;
    disabled?: boolean;
    icon?: IconDefinition;
    description?: string;
    group?: string;
}

export type SelectVariant = 'default' | 'filled' | 'outlined' | 'ghost';

export interface SelectProps {
    // Dados
    options: SelectOption[];
    value?: string | number | (string | number)[];
    defaultValue?: string | number | (string | number)[];

    // Configuração básica
    label?: string;
    placeholder?: string;
    variant?: SelectVariant;
    size?: 'small' | 'medium' | 'large';

    // Funcionalidades
    multiple?: boolean;
    searchable?: boolean;
    clearable?: boolean;
    disabled?: boolean;
    loading?: boolean;

    // Estados
    error?: string | boolean;
    success?: string | boolean;
    warning?: string | boolean;

    // Aparência
    leftIcon?: IconDefinition;
    rightIcon?: IconDefinition;

    // Comportamento
    maxHeight?: number; // altura máxima do dropdown
    maxSelectedDisplay?: number; // quantos itens mostrar antes de "+N mais"

    // Textos auxiliares
    helperText?: string;
    noOptionsText?: string;
    loadingText?: string;
    searchPlaceholder?: string;

    // Callbacks
    onChange?: (value: string | number | (string | number)[] | null) => void;
    onSearch?: (searchTerm: string) => void;
    onOpen?: () => void;
    onClose?: () => void;

    // Classes customizáveis
    className?: string;
    containerClassName?: string;
    dropdownClassName?: string;
    optionClassName?: string;

    // Referências
    containerRef?: React.Ref<HTMLDivElement>;
}