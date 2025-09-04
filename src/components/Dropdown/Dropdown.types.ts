import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import React from 'react';

export interface DropdownItem {
    key: string;
    label?: string; // Opcional para dividers e headers
    icon?: IconDefinition;
    description?: string;
    disabled?: boolean;
    onClick?: () => void;
    href?: string;
    target?: string;
    type?: 'item' | 'divider' | 'header';
    danger?: boolean;
}

export type DropdownTrigger = 'click' | 'hover' | 'contextMenu';
export type DropdownPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' | 'left' | 'right';

export interface DropdownProps {
    // Conteúdo
    items: DropdownItem[];
    children: React.ReactNode; // Trigger element

    // Configuração
    trigger?: DropdownTrigger | DropdownTrigger[];
    placement?: DropdownPlacement;
    disabled?: boolean;

    // Aparência
    arrow?: boolean;
    maxHeight?: number;
    minWidth?: number;

    // Comportamento
    closeOnSelect?: boolean;
    closeOnClickOutside?: boolean;
    closeOnEscape?: boolean;

    // Estados
    open?: boolean; // Controlled
    defaultOpen?: boolean; // Uncontrolled

    // Callbacks
    onOpenChange?: (open: boolean) => void;
    onSelect?: (item: DropdownItem) => void;

    // Classes customizáveis
    className?: string;
    dropdownClassName?: string;
    itemClassName?: string;

    // Referências
    containerRef?: React.Ref<HTMLDivElement>;
}
