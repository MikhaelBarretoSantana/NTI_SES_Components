import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import React from 'react';

export interface DateRangeValue {
    startDate: string | null;
    endDate: string | null;
}

export interface DateRangePreset {
    key: string;
    label: string;
    getValue: () => DateRangeValue;
    description?: string;
}

export type DateRangeVariant = 'default' | 'filled' | 'outlined' | 'ghost';

export interface DateRangeProps {
    // Valor
    value?: DateRangeValue;
    defaultValue?: DateRangeValue;
    
    // Configuração básica
    label?: string;
    placeholder?: string;
    variant?: DateRangeVariant;
    size?: 'small' | 'medium' | 'large';
    
    // Estados
    disabled?: boolean;
    loading?: boolean;
    error?: string | boolean;
    success?: string | boolean;
    warning?: string | boolean;
    
    // Aparência
    leftIcon?: IconDefinition;
    rightIcon?: IconDefinition;
    separator?: string;
    
    // Funcionalidades
    clearable?: boolean;
    showPresets?: boolean;
    presets?: DateRangePreset[];
    
    // Validação
    minDate?: string;
    maxDate?: string;
    maxRange?: number; // em dias
    
    // Formato
    dateFormat?: string;
    locale?: string;
    
    // Textos auxiliares
    helperText?: string;
    startDateLabel?: string;
    endDateLabel?: string;
    presetsTitle?: string;
    
    // Callbacks
    onChange?: (value: DateRangeValue | null) => void;
    onClear?: () => void;
    onPresetSelect?: (preset: DateRangePreset) => void;
    
    // Classes customizáveis
    className?: string;
    containerClassName?: string;
    dropdownClassName?: string;
    
    // Referências
    containerRef?: React.Ref<HTMLDivElement>;
}