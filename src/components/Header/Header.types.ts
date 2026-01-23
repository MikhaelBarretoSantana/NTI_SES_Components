import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import React from 'react';

export interface HeaderLogo {
    text: string;
    icon?: IconDefinition;
    image?: string;
    href?: string;
    position?: 'left' | 'center' | 'right'; // Posição da logo no desktop
    mobilePosition?: 'left' | 'center' | 'right'; // Posição da logo no mobile
}

export interface HeaderNavigationItem {
    key: string;
    label: string;
    icon?: IconDefinition;
    href?: string;
    disabled?: boolean;
    active?: boolean;
}

export interface HeaderActionButton {
    label: string;
    icon?: IconDefinition;
    variant?: 'primary' | 'secondary' | 'ghost';
    disabled?: boolean;
}

export interface HeaderProps {
    // Logo
    logo?: HeaderLogo;
    
    // Navigation
    navigation?: HeaderNavigationItem[];
    
    // Action Button
    actionButton?: HeaderActionButton | null;
    
    // Mobile behavior
    showMobileMenu?: boolean;
    mobileMenuAlign?: 'left' | 'center' | 'right'; // Alinhamento dos itens do menu mobile
    
    // Desktop behavior
    desktopNavAlign?: 'left' | 'center' | 'right'; // Alinhamento dos itens de navegação no desktop
    
    // Callbacks
    onNavigationClick?: (item: HeaderNavigationItem) => void;
    onActionClick?: () => void;
    onLogoClick?: () => void;
    
    // Styling
    className?: string;
    variant?: 'default' | 'transparent';
    sticky?: boolean;
    
    // Reference
    containerRef?: React.Ref<HTMLElement>;
}